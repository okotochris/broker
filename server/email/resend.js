const { Resend } = require('resend'); // destructure Resend
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = 'otp@studynest.com.ng';
const EasyTrustGlobal = 'Capitextradecompany';
const companyName = 'Capitextradecompany';

async function sendOTP(email, code) {
  const htmlText = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 40px 20px;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <h1 style="color: #1a73e8; margin-bottom: 5px;">${EasyTrustGlobal}</h1>
        <p style="color: #999; font-size: 13px; margin-top: 0;">
          Trusted service
        </p>

        <h2 style="color: #333; margin-top: 25px;">Email Verification</h2>
        
        <p style="color: #666; font-size: 15px;">
          Hello,<br/><br/>
          Use the verification code below to complete your registration on <strong>${EasyTrustGlobal}</strong>.
        </p>

        <div style="margin: 25px 0;">
          <span style="
            display: inline-block;
            font-size: 28px;
            letter-spacing: 8px;
            font-weight: bold;
            color: #1a73e8;
            background: #f1f7ff;
            padding: 15px 25px;
            border-radius: 8px;
          ">
            ${code}
          </span>
        </div>

        <p style="color: #888; font-size: 13px;">
          This code will expire in 5 minutes.
        </p>

        <p style="color: #aaa; font-size: 12px; margin-top: 30px;">
          © ${new Date().getFullYear()} ${companyName}. All rights reserved.
        </p>

      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: sender,
      to: email,
      subject: 'Your OTP Code',
      html: htmlText
    });

    console.log('OTP sent');
  } catch (err) {
    console.error(err);
  }
}

module.exports = sendOTP;