package com.sba.exam.sba.service.imp;

import org.springframework.stereotype.Service;


public interface OTPServiceImp {
    String generateOtp(String phoneNumber);
    boolean verifyOtp(String phoneNumber, String otp);
}
