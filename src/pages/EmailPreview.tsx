import React from 'react';

export const EmailPreview: React.FC = () => {
    // This HTML string is what will be sent via Nodemailer
    // Using inline styles for email client compatibility
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to BECon 2026</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            background-color: #05020a;
            font-family: 'Inter', sans-serif;
            color: #ffffff;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #05020a;
        }
        
        .header {
            text-align: center;
            padding: 40px 0;
            background: linear-gradient(180deg, rgba(88, 28, 135, 0.1) 0%, rgba(5, 2, 10, 0) 100%);
        }
        
        .logo {
            width: 120px;
            height: auto;
        }
        
        .content {
            padding: 20px 40px;
        }
        
        .hero-text {
            font-size: 32px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 30px;
            background: linear-gradient(90deg, #60A5FA, #A78BFA, #F472B6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            /* Fallback for email clients that don't support bg-clip */
            color: #A78BFA;
        }
        
        .card {
            background-color: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .becon-id-label {
            color: #9CA3AF;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 10px;
        }
        
        .becon-id {
            font-family: monospace;
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 2px;
            text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
            background: rgba(0, 0, 0, 0.3);
            padding: 15px 20px;
            border-radius: 8px;
            border: 1px dashed rgba(139, 92, 246, 0.5);
            display: inline-block;
        }
        
        .message {
            color: #D1D5DB;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .btn {
            display: block;
            width: 200px;
            margin: 0 auto;
            padding: 16px 0;
            background: linear-gradient(90deg, #7C3AED, #DB2777);
            color: #ffffff;
            text-decoration: none;
            font-weight: 600;
            text-align: center;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
        }
        
        .footer {
            text-align: center;
            padding: 40px 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            margin-top: 40px;
        }
        
        .footer-text {
            color: #6B7280;
            font-size: 12px;
            line-height: 1.5;
        }
        
        .social-link {
            color: #9CA3AF;
            text-decoration: none;
            margin: 0 10px;
            font-size: 14px;
        }

        /* Responsive */
        @media only screen and (max-width: 600px) {
            .content {
                padding: 20px;
            }
            .hero-text {
                font-size: 24px;
            }
            .becon-id {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <!-- Using public folder image for now, replace with hosted URL in production -->
            <img src="https://becon-2026.web.app/logo.avif" alt="BECon Logo" class="logo">
        </div>

        <!-- Content -->
        <div class="content">
            <h1 class="hero-text">Welcome to the Future, [Name]!</h1>
            
            <p class="message">
                You're officially registered for BECon 2026. Get ready to explore the cutting edge of business, entrepreneurship, and technology.
            </p>

            <!-- BECon ID Card -->
            <div class="card">
                <div class="becon-id-label">YOUR BECON ID</div>
                <div class="becon-id">BEC26-XXXX-XXXX</div>
            </div>

            <p class="message">
                Your dashboard is your command center. Check your application status, view event schedules, and connect with other attendees.
            </p>

            <!-- CTA Button -->
            <a href="https://becon.in/dashboard" class="btn">
                Visit Dashboard
            </a>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                <a href="#" class="social-link">Instagram</a> • 
                <a href="#" class="social-link">LinkedIn</a> • 
                <a href="#" class="social-link">Website</a>
            </p>
            <p class="footer-text">
                eDC Office, IIT Delhi, Hauz Khas, New Delhi - 110016<br>
                Questions? Contact us at <a href="mailto:team@edciitd.com" style="color: #A78BFA; text-decoration: none;">team@edciitd.com</a>
            </p>
            <p class="footer-text" style="opacity: 0.5; margin-top: 20px;">
                © 2026 BECon IIT Delhi. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
            <div className="w-full max-w-[800px] bg-[#111] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <div className="bg-[#1a1a1a] px-4 py-2 border-b border-white/5 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Email Preview</span>
                    <span className="text-xs text-gray-600">HTML Render</span>
                </div>
                {/* Render the email HTML inside an iframe to simulate email client isolation */}
                <iframe
                    srcDoc={emailHtml}
                    className="w-full h-[800px] bg-white"
                    title="Email Preview"
                    style={{ border: 'none' }}
                />
            </div>
        </div>
    );
};
