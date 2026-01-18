package com.CodeLab.RCE_System.service;

import com.CodeLab.RCE_System.request_dto.ContestStartDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private final JavaMailSender javaMailSender;

    @Autowired
    public MailService(JavaMailSender javaMailSender){
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendOTPMail(String to, String otp){
        String html = generateHtmlForOtp(otp);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setText(html, true);
            helper.setSubject("Your CodeLab OTP for Verification");

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Async
    public void sendContestStartReminderMail(String[] to, ContestStartDTO dto){
        String html = generateHtmlForContestReminder(dto);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setSubject("Your Registered CodeLab Contest Has Started!");
            helper.setText(html, true);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateHtmlForOtp(String otp){
        String otpEmailTemplate = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <title>CodeLab OTP Verification</title>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Orbitron:wght@600&display=swap" rel="stylesheet">
              <style>
                body {
                  font-family: 'Inter', sans-serif;
                  background-color: #0f0f0f;
                  margin: 0;
                  padding: 0;
                  color: #ffffff;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background-color: #1a1a1a;
                  border-radius: 10px;
                  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
                  padding: 30px;
                  color: #e0e0e0;
                }
                .header {
                  text-align: center;
                  padding-bottom: 20px;
                }
                .header h1 {
                  margin: 0;
                  font-family: 'Orbitron', sans-serif;
                  color: #00bfff;
                  font-size: 30px;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                }
                .content {
                  font-size: 16px;
                  line-height: 1.6;
                }
                .otp {
                  display: inline-block;
                  font-size: 26px;
                  font-weight: 600;
                  color: #00bfff;
                  background-color: #121212;
                  border: 1px dashed #00bfff;
                  padding: 14px 28px;
                  border-radius: 8px;
                  margin: 24px 0;
                }
                .footer {
                  margin-top: 30px;
                  font-size: 14px;
                  text-align: center;
                  color: #777;
                }
                .button {
                  display: inline-block;
                  margin-top: 20px;
                  background-color: #00bfff;
                  color: #000;
                  padding: 10px 20px;
                  border-radius: 6px;
                  font-weight: 600;
                  text-decoration: none;
                }
                .button:hover {
                  background-color: #0099cc;
                }
              </style>
            </head>
            <body>
            
            <div class="container">
              <div class="header">
                <h1>CodeLab</h1>
              </div>
            
              <div class="content">
                <p>Hello,</p>
                <p>Your One-Time Password (OTP) for verifying your identity on <strong>CodeLab</strong> is:</p>
                <div class="otp">%s</div>
                <p>This code is valid for the next 5 minutes. Please do not share it with anyone.</p>
                <p>If you did not request this, you can safely ignore this email.</p>
                <p>Best regards,<br/>The CodeLab Team</p>
              </div>
            
              <div class="footer">
                &copy; 2025 CodeLab. All rights reserved.
              </div>
            </div>
            
            </body>
            </html>
            """;

        return String.format(otpEmailTemplate, otp);
    }

    public String generateHtmlForContestReminder(ContestStartDTO dto){
        String contestStartedEmailTemplate = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>CodeLab Contest Started</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Orbitron:wght@600&display=swap" rel="stylesheet">
                <style>
                    body {
                      font-family: 'Inter', sans-serif;
                      background-color: #0f0f0f;
                      margin: 0;
                      padding: 0;
                      color: #ffffff;
                    }
                    .container {
                      max-width: 600px;
                      margin: 40px auto;
                      background-color: #1a1a1a;
                      border-radius: 10px;
                      box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
                      padding: 30px;
                      color: #e0e0e0;
                    }
                    .header {
                      text-align: center;
                      padding-bottom: 20px;
                    }
                    .header h1 {
                      margin: 0;
                      font-family: 'Orbitron', sans-serif;
                      color: #00bfff;
                      font-size: 30px;
                      letter-spacing: 2px;
                      text-transform: uppercase;
                    }
                    .content {
                      font-size: 16px;
                      line-height: 1.6;
                    }
                    .highlight-box {
                      background-color: #121212;
                      border-left: 4px solid #00bfff;
                      padding: 16px;
                      margin: 20px 0;
                      border-radius: 8px;
                    }
                    .footer {
                      margin-top: 30px;
                      font-size: 14px;
                      text-align: center;
                      color: #777;
                    }
                    .button {
                      display: inline-block;
                      margin-top: 20px;
                      background-color: #00bfff;
                      color: #000;
                      padding: 10px 20px;
                      border-radius: 6px;
                      font-weight: 600;
                      text-decoration: none;
                    }
                    .button:hover {
                      background-color: #0099cc;
                    }
                </style>
            </head>
            <body>
            
            <div class="container">
                <div class="header">
                    <h1>CodeLab</h1>
                </div>
            
                <div class="content">
                    <p>Hello,</p>
                    <p>This is a quick reminder that your registered contest on <strong>CodeLab</strong> has just started!</p>
            
                    <div class="highlight-box">
                        <p><strong>Contest:</strong> %s</p>
                        <p><strong>Start Time:</strong> %s</p>
                        <p><strong>End Time:</strong> %s</p>
                        <p><strong>Duration:</strong> %s</p>
                    </div>
            
                    <p>You can start solving problems by clicking the button below:</p>
                    <a href="https://your-platform-link.com/contests" class="button">Join Contest Now</a>
            
                    <p>Let the code games begin!<br/><strong>— CodeLab</strong></p>
            
                </div>
            
                <div class="footer">
                    &copy; 2025 CodeLab. All rights reserved.
                </div>
            </div>
            
            </body>
            </html>
            """;

        return String.format(contestStartedEmailTemplate, dto.getContestName(), dto.getContestStartTime(), dto.getContestEndTime(), dto.getContestDuration());
    }
}
