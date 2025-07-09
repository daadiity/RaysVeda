const nodemailer = require('nodemailer');

// Create transporter using Mailtrap
const transporter = nodemailer.createTransporter({
  host: process.env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io',
  port: process.env.MAILTRAP_PORT || 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendWelcomeEmail = async (userEmail, fullName, tempPassword) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@raysveda.com',
    to: userEmail,
    subject: 'Welcome to RaysVeda - Your Account Details',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d35400; font-size: 28px; margin: 0;">🕉️ RaysVeda</h1>
            <p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">Ancient Wisdom, Modern Convenience</p>
          </div>
          
          <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Welcome, ${fullName}!</h2>
          
          <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for booking a pooja with RaysVeda. Your account has been created successfully, and we're excited to serve you on your spiritual journey.
          </p>
          
          <div style="background-color: #fff8f0; padding: 20px; border-radius: 8px; border-left: 4px solid #d35400; margin: 20px 0;">
            <h3 style="color: #d35400; margin: 0 0 15px 0; font-size: 18px;">Your Login Credentials:</h3>
            <p style="margin: 5px 0; color: #333;"><strong>Username:</strong> ${userEmail}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Temporary Password:</strong> <code style="background-color: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${tempPassword}</code></p>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2d5a2d; font-size: 14px;">
              <strong>🔒 Security Note:</strong> Please change your password after your first login for security purposes.
            </p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/login" style="background-color: #d35400; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Login to Your Account</a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
            <h3 style="color: #333; font-size: 18px; margin-bottom: 15px;">What's Next?</h3>
            <ul style="color: #555; line-height: 1.8; padding-left: 20px;">
              <li>Login to your account to view your booking details</li>
              <li>Track your pooja booking status</li>
              <li>Explore our other spiritual services</li>
              <li>Update your profile and preferences</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 14px; margin: 0;">
              If you have any questions, please contact us at 
              <a href="mailto:support@raysveda.com" style="color: #d35400;">support@raysveda.com</a>
            </p>
            <p style="color: #888; font-size: 12px; margin: 10px 0 0 0;">
              © 2024 RaysVeda. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

const sendBookingConfirmationEmail = async (userEmail, fullName, bookingDetails) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL || 'noreply@raysveda.com',
    to: userEmail,
    subject: 'Pooja Booking Confirmation - RaysVeda',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d35400; font-size: 28px; margin: 0;">🕉️ RaysVeda</h1>
            <p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">Pooja Booking Confirmation</p>
          </div>
          
          <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Booking Confirmed!</h2>
          
          <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Dear ${fullName}, your pooja booking has been confirmed. Here are your booking details:
          </p>
          
          <div style="background-color: #fff8f0; padding: 20px; border-radius: 8px; border-left: 4px solid #d35400; margin: 20px 0;">
            <h3 style="color: #d35400; margin: 0 0 15px 0; font-size: 18px;">Booking Details:</h3>
            <p style="margin: 5px 0; color: #333;"><strong>Pooja Type:</strong> ${bookingDetails.poojaType}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Date:</strong> ${new Date(bookingDetails.preferredDate).toLocaleDateString()}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Time:</strong> ${bookingDetails.preferredTime}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Gotra:</strong> ${bookingDetails.gotra}</p>
            ${bookingDetails.specialRequests ? `<p style="margin: 5px 0; color: #333;"><strong>Special Requests:</strong> ${bookingDetails.specialRequests}</p>` : ''}
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #888; font-size: 14px; margin: 0;">
              Thank you for choosing RaysVeda for your spiritual needs.
            </p>
          </div>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent successfully to:', userEmail);
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    throw error;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendBookingConfirmationEmail
};