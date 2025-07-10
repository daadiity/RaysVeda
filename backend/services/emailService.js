const nodemailer = require("nodemailer");

// Create email transporter - FIXED: Use createTransport (not createTransporter)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: parseInt(process.env.MAILTRAP_PORT),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });
};

// Test email connection
const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Email service connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Email connection failed:", error);
    return false;
  }
};

// Welcome email template
const getWelcomeEmailTemplate = (userName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to RaysVeda</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #fff7ea 0%, #ffede0 100%);
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                margin-top: 20px;
                margin-bottom: 20px;
            }
            .header {
                background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                color: white;
                text-align: center;
                padding: 40px 20px;
                position: relative;
            }
            .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('https://images.unsplash.com/photo-1604608672516-d3d91a2555c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80') center/cover;
                opacity: 0.1;
                z-index: 1;
            }
            .header-content {
                position: relative;
                z-index: 2;
            }
            .logo {
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .welcome-text {
                font-size: 1.2rem;
                opacity: 0.9;
            }
            .content {
                padding: 40px 30px;
            }
            .greeting {
                font-size: 1.5rem;
                color: #333;
                margin-bottom: 20px;
                text-align: center;
            }
            .main-text {
                color: #555;
                font-size: 1.1rem;
                margin-bottom: 30px;
                text-align: center;
                line-height: 1.8;
            }
            .features {
                background: #f8f9fa;
                border-radius: 15px;
                padding: 30px;
                margin: 30px 0;
            }
            .features h3 {
                color: #ff6b35;
                text-align: center;
                margin-bottom: 25px;
                font-size: 1.3rem;
            }
            .feature-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }
            .feature-item {
                background: white;
                padding: 20px;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
                border: 2px solid #ff6b35;
            }
            .feature-emoji {
                font-size: 2rem;
                margin-bottom: 10px;
                display: block;
            }
            .feature-title {
                font-weight: bold;
                color: #333;
                margin-bottom: 8px;
            }
            .feature-desc {
                color: #666;
                font-size: 0.9rem;
            }
            .cta-section {
                background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                color: white;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
                margin: 30px 0;
            }
            .cta-button {
                display: inline-block;
                background: white;
                color: #ff6b35;
                padding: 15px 30px;
                border-radius: 25px;
                text-decoration: none;
                font-weight: bold;
                margin-top: 15px;
                transition: transform 0.3s ease;
            }
            .cta-button:hover {
                transform: translateY(-2px);
            }
            .footer {
                background: #f8f9fa;
                padding: 30px;
                text-align: center;
                color: #666;
                border-top: 1px solid #eee;
            }
            .social-links {
                margin: 20px 0;
            }
            .social-links a {
                color: #ff6b35;
                text-decoration: none;
                margin: 0 10px;
                font-size: 1.1rem;
            }
            .divider {
                height: 4px;
                background: linear-gradient(135deg, #ff6b35, #f7931e);
                border-radius: 2px;
                margin: 30px auto;
                width: 100px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div class="header-content">
                    <div class="logo">🕉️ RaysVeda</div>
                    <div class="welcome-text">Welcome to Your Spiritual Journey</div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="content">
                <div class="greeting">
                    🙏 Namaste ${userName}!
                </div>
                
                <div class="main-text">
                    Thank you for joining <strong>RaysVeda</strong> - your trusted platform for authentic Vedic traditions and spiritual practices! 🌟
                    <br><br>
                    We're thrilled to have you as part of our divine community where ancient wisdom meets modern convenience.
                </div>

                <div class="divider"></div>

                <!-- Features Section -->
                <div class="features">
                    <h3>✨ What RaysVeda Offers You</h3>
                    <div class="feature-grid">
                        <div class="feature-item">
                            <span class="feature-emoji">🪔</span>
                            <div class="feature-title">Sacred Puja Services</div>
                            <div class="feature-desc">Book authentic Vedic pujas performed by certified priests</div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-emoji">📿</span>
                            <div class="feature-title">Spiritual Guidance</div>
                            <div class="feature-desc">Kundli readings, numerology, and Vastu consultations</div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-emoji">🕉️</span>
                            <div class="feature-title">Vedic Wisdom</div>
                            <div class="feature-desc">Access to mantras, meditation guides, and sacred texts</div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-emoji">🤝</span>
                            <div class="feature-title">Community Seva</div>
                            <div class="feature-desc">Participate in charitable programs and community service</div>
                        </div>
                    </div>
                </div>

                <!-- CTA Section -->
                <div class="cta-section">
                    <h3>🚀 Ready to Begin Your Spiritual Journey?</h3>
                    <p>Explore our services and book your first puja with special new member benefits!</p>
                    <a href="http://localhost:5173" class="cta-button">
                        🏠 Visit RaysVeda Dashboard
                    </a>
                </div>

                <!-- Benefits -->
                <div style="text-align: center; margin: 30px 0;">
                    <h4 style="color: #ff6b35; margin-bottom: 20px;">🎁 Your Membership Benefits</h4>
                    <div style="color: #666;">
                        ✅ 24/7 Customer Support<br>
                        ✅ Expert Vedic Consultations<br>
                        ✅ Authentic Ritual Performances<br>
                        ✅ Personalized Spiritual Guidance<br>
                        ✅ Community Events & Programs
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div style="margin-bottom: 20px;">
                    <strong>Contact Us</strong><br>
                    📧 support@raysveda.com<br>
                    📞 +91-9161-110-130<br>
                    📍 11/13/4C, Tashkand Marg, Civil Lines, Allahabad, UP - 211001
                </div>
                
                <div class="social-links">
                    <a href="#">🌐 Website</a>
                    <a href="#">📱 WhatsApp</a>
                    <a href="#">📘 Facebook</a>
                    <a href="#">📸 Instagram</a>
                </div>
                
                <div style="font-size: 0.9rem; margin-top: 20px; color: #999;">
                    This email was sent because you registered an account with RaysVeda.<br>
                    © 2024 RaysVeda. All rights reserved.
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Modify existing function in emailService.js
const sendWelcomeEmail = async (
  userEmail,
  userName,
  tempPassword = null,
  profileLink = null
) => {
  try {
    console.log("📧 Attempting to send welcome email to:", userEmail);

    const transporter = createTransporter();

    let introHtml = `
      <p style="font-size: 1.1rem;">Thank you for joining <strong>RaysVeda</strong> — your trusted platform for authentic Vedic traditions and spiritual practices.</p>
    `;

    if (tempPassword && profileLink) {
      introHtml += `
        <p><strong>Your Account Details:</strong></p>
        <ul>
          <li>Email: <strong>${userEmail}</strong></li>
          <li>Temporary Password: <strong>${tempPassword}</strong></li>
        </ul>
        <p>Please click the link below to set your password and complete your profile:</p>
        <p><a href="${profileLink}" target="_blank">${profileLink}</a></p>
      `;
    }

    const mailOptions = {
      from: `"${process.env.MAILTRAP_FROM_NAME}" <${process.env.MAILTRAP_FROM_EMAIL}>`,
      to: userEmail,
      subject: "🕉️ Welcome to RaysVeda - Your Spiritual Journey Begins! 🙏",
      html: `
        <html>
        <body style="font-family: sans-serif; padding: 20px;">
          <h2>Namaste ${userName} 🙏</h2>
          ${introHtml}
          <hr/>
          <p style="font-size: 0.9rem; color: #888;">You are receiving this email because you interacted with RaysVeda. Contact us at support@raysveda.com</p>
        </body>
        </html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent successfully to:", userEmail);

    return {
      success: true,
      messageId: result.messageId,
      recipient: userEmail,
    };
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
    return {
      success: false,
      error: error.message,
      recipient: userEmail,
    };
  }
};

module.exports = {
  sendWelcomeEmail,
  testEmailConnection,
};
