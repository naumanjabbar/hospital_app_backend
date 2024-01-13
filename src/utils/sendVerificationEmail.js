import nodemailer from 'nodemailer';

export function generateToken() {
  return Math.random().toString(36).substr(2, 10);
}

export async function sendVerificationEmail(email, verificationToken) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nauman@pursue.today',
      pass: 'ebvd vlfu vqtt oesz',
    },
  });

  const mailOptions = {
    from: 'nauman@pursue.today',
    to: email,
    subject: 'Please verify your email to register your account',
    html: `<b>${verificationToken}</b>`,
  };

  await transporter.sendMail(mailOptions);
}

// Function to generate a reset password token
function generateResetToken() {
  return generateToken();
}

// Function to send a reset password email
export async function sendResetPasswordEmail(email, resetToken) {
  // Create a nodemailer transporter (replace with your email provider's settings)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  // Define email options
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Reset Password',
    html: `<p>Click the following link to reset your password: <a href="http://your-website.com/reset-password/${resetToken}">Reset Password</a></p>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
