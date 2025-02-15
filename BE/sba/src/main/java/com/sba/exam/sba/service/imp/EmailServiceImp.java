package com.sba.exam.sba.service.imp;

import org.springframework.stereotype.Service;

@Service
public interface EmailServiceImp {
    boolean sendMail(String to, String subject, String body);
    boolean sendOtpEmail(String email, String otp);
}
