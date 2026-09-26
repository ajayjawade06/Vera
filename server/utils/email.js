const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"VERA" <${process.env.EMAIL_FROM}>`,
    to,
    subject: 'Your VERA Authentication Code',
    text: `Your verification code is: ${otp}. It will expire in 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Your VERA Authentication Code</h2>
        <p>Use the following 6-digit code to continue:</p>
        <div style="background-color: #f4f4f4; padding: 15px; font-size: 24px; letter-spacing: 5px; text-align: center; border-radius: 8px;">
          <strong>${otp}</strong>
        </div>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">This code expires in 5 minutes. Do not share this code with anyone.</p>
      </div>
    `,
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
};

module.exports = { sendOtpEmail };
