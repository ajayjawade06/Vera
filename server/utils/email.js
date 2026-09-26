const sendOtpEmail = async (to, otp) => {
  const url = 'https://api.brevo.com/v3/smtp/email';
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error('BREVO_API_KEY is missing from environment variables');
  }

  const payload = {
    sender: { name: 'VERA', email: process.env.EMAIL_FROM || 'noreply@vera.com' },
    to: [{ email: to }],
    subject: 'Your VERA Authentication Code',
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Your VERA Authentication Code</h2>
        <p>Use the following 6-digit code to continue:</p>
        <div style="background-color: #f4f4f4; padding: 15px; font-size: 24px; letter-spacing: 5px; text-align: center; border-radius: 8px;">
          <strong>${otp}</strong>
        </div>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">This code expires in 5 minutes. Do not share this code with anyone.</p>
      </div>
    `
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': apiKey,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Brevo API Error:', errorText);
    throw new Error('Failed to send email via Brevo API');
  }

  return await response.json();
};

module.exports = { sendOtpEmail };
