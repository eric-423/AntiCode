package com.sba.exam.sba.service;

import com.sba.exam.sba.service.imp.EmailServiceImp;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService implements EmailServiceImp {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public boolean sendMail(String to, String subject, String body) {
        MimeMessage message = mailSender.createMimeMessage();
        try{
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            this.mailSender.send(message);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public boolean sendOtpEmail(String email, String otp) {
        String subject = "OTP Verification";
        String body = "Your OTP is: " + otp;
        return sendMail(email, subject, body);
    }
}
