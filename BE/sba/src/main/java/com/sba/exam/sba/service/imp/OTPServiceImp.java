package com.sba.exam.sba.service.imp;

import org.springframework.stereotype.Service;


public interface OTPServiceImp {
    String generateOtp(String email);
    boolean verifyOtp(String email, String otp);
    boolean isOtpVerified(String email);
}
