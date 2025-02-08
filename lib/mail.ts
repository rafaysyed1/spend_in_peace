import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, verificationCode: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification - Spend In Peace',
    html: `
      <h1>Email Verification</h1>
      <p>Your verification code is: <strong>${verificationCode}</strong></p>
      <p>This code will expire in 24 hours.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }
}


export async function sendResetPasswordEmail(email: string, resetCode: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset - Spend In Peace',
      html: `
        <h1>Password Reset</h1>
        <p>Your password reset code is: <strong>${resetCode}</strong></p>
        <p>This code will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending reset email:', error);
      throw new Error('Failed to send reset email');
    }
  }