const express = require('express');
const router = express.Router();
const {
  instagramRequestOtp,
  instagramVerifyOtp,
  requestEmailOtp,
  verifyEmailOtp,
  requestPhoneOtp,
  verifyPhoneOtp,
  getMe,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/instagram/request-otp', instagramRequestOtp);
router.post('/instagram/verify-otp', instagramVerifyOtp);

router.post('/email/request-otp', requestEmailOtp);
router.post('/email/verify-otp', verifyEmailOtp);

router.post('/phone/request-otp', requestPhoneOtp);
router.post('/phone/verify-otp', verifyPhoneOtp);

router.get('/me', protect, getMe);
router.post('/logout', logout);

module.exports = router;
