const User = require('../models/User');
const Otp = require('../models/Otp');
const { generateToken, setTokenCookie } = require('../utils/token');
const { hashData, verifyHash } = require('../utils/hash');
const { sendOtpEmail } = require('../utils/email');

const generateOtpCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Instagram Request OTP
const instagramRequestOtp = async (req, res) => {
  try {
    const { instagramId, password, email, phone } = req.body;
    if (!instagramId || !password || !email || !phone) {
      return res.status(400).json({ message: 'Instagram ID, password, email, and phone are required' });
    }

    let user = await User.findOne({ instagramId });
    if (user && user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const otp = generateOtpCode();
    const otpHash = await hashData(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ identifier: email });
    await Otp.create({ identifier: email, otpHash, expiresAt });
    
    try {
      await sendOtpEmail(email, otp);
    } catch (e) {
      console.error('Email send error:', e);
      return res.status(500).json({ message: 'Failed to send OTP email.' });
    }

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Instagram Verify OTP
const instagramVerifyOtp = async (req, res) => {
  try {
    const { instagramId, password, email, phone, otp } = req.body;
    if (!instagramId || !password || !email || !phone || !otp) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const otpRecord = await Otp.findOne({ identifier: email });
    if (!otpRecord) return res.status(400).json({ message: 'Invalid or expired OTP' });
    
    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (otpRecord.attempts >= 3) {
       return res.status(400).json({ message: 'Too many attempts. Request a new OTP.' });
    }

    const isMatch = await verifyHash(otpRecord.otpHash, otp);
    if (!isMatch) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return res.status(400).json({ message: "That code doesn't look right. Try again." });
    }

    await Otp.deleteOne({ _id: otpRecord._id });

    let user = await User.findOne({ instagramId });
    if (!user) {
      user = await User.create({
        instagramId,
        password,
        email,
        phoneNumber: phone,
        isEmailVerified: true,
        authMethod: 'instagram',
        lastLoginAt: new Date(),
      });
    } else {
      user.email = email;
      user.phoneNumber = phone;
      user.isEmailVerified = true;
      user.lastLoginAt = new Date();
      await user.save();
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);
    res.status(200).json({ message: 'Authentication successful', user: { id: user._id, instagramId: user.instagramId, email: user.email, authMethod: user.authMethod } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Email OTP Request
const requestEmailOtp = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const otp = generateOtpCode();
    const otpHash = await hashData(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await Otp.deleteMany({ identifier: email }); // Clear previous OTPs
    await Otp.create({ identifier: email, otpHash, expiresAt });
    
    try {
      await sendOtpEmail(email, otp);
    } catch (e) {
      console.error('Email send error:', e);
      return res.status(500).json({ message: 'Failed to send OTP email. Please try again later.' });
    }

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Email OTP Verify
const verifyEmailOtp = async (req, res) => {
  try {
    const { email, phone, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const otpRecord = await Otp.findOne({ identifier: email });
    if (!otpRecord) return res.status(400).json({ message: 'Invalid or expired OTP' });
    
    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (otpRecord.attempts >= 3) {
       return res.status(400).json({ message: 'Too many attempts. Request a new OTP.' });
    }

    const isMatch = await verifyHash(otpRecord.otpHash, otp);
    if (!isMatch) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return res.status(400).json({ message: "That code doesn't look right. Try again." });
    }

    // OTP matched
    await Otp.deleteOne({ _id: otpRecord._id });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        phoneNumber: phone || '',
        isEmailVerified: true,
        authMethod: 'email',
        lastLoginAt: new Date(),
      });
    } else {
      user.isEmailVerified = true;
      user.lastLoginAt = new Date();
      if (phone) user.phoneNumber = phone;
      await user.save();
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);
    res.status(200).json({ message: 'Authentication successful', user: { id: user._id, email: user.email, phoneNumber: user.phoneNumber, authMethod: user.authMethod } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Phone OTP Request (simulated sending, but we actually send to an email address per requirements)
const requestPhoneOtp = async (req, res) => {
  try {
    const { phone, emailForOtp } = req.body;
    if (!phone || !emailForOtp) return res.status(400).json({ message: 'Phone and email for OTP are required' });

    const otp = generateOtpCode();
    const otpHash = await hashData(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ identifier: phone });
    await Otp.create({ identifier: phone, otpHash, expiresAt });
    
    try {
      await sendOtpEmail(emailForOtp, otp);
    } catch (e) {
      console.error('Email send error:', e);
      return res.status(500).json({ message: 'Failed to send OTP email.' });
    }

    res.status(200).json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Phone OTP Verify
const verifyPhoneOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: 'Phone and OTP are required' });

    const otpRecord = await Otp.findOne({ identifier: phone });
    if (!otpRecord) return res.status(400).json({ message: 'Invalid or expired OTP' });
    
    if (new Date() > otpRecord.expiresAt) {
      await Otp.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    if (otpRecord.attempts >= 3) {
       return res.status(400).json({ message: 'Too many attempts. Request a new OTP.' });
    }

    const isMatch = await verifyHash(otpRecord.otpHash, otp);
    if (!isMatch) {
      otpRecord.attempts += 1;
      await otpRecord.save();
      return res.status(400).json({ message: "That code doesn't look right. Try again." });
    }

    await Otp.deleteOne({ _id: otpRecord._id });

    let user = await User.findOne({ phoneNumber: phone });
    if (!user) {
      user = await User.create({
        phoneNumber: phone,
        isPhoneVerified: true,
        authMethod: 'phone',
        lastLoginAt: new Date(),
      });
    } else {
      user.isPhoneVerified = true;
      user.lastLoginAt = new Date();
      await user.save();
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);
    res.status(200).json({ message: 'Authentication successful', user: { id: user._id, phoneNumber: user.phoneNumber, authMethod: user.authMethod } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  instagramRequestOtp,
  instagramVerifyOtp,
  requestEmailOtp,
  verifyEmailOtp,
  requestPhoneOtp,
  verifyPhoneOtp,
  getMe,
  logout
};
