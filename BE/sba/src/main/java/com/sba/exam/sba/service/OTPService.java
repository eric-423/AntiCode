package com.sba.exam.sba.service;

import com.sba.exam.sba.entity.OTP;
import com.sba.exam.sba.repository.OTPRepository;
import com.sba.exam.sba.service.imp.OTPServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OTPService implements OTPServiceImp {

    private final Random random = new Random();

    @Autowired
    private OTPRepository otpRepository;

    @Override
    public String generateOtp(String email) {
        String otp = String.format("%06d", random.nextInt(999999));
        OTP otpRecord = new OTP();
        otpRecord.setEmail(email);
        otpRecord.setOtp(otp);
        otpRecord.setExpiredAt(LocalDateTime.now().plusMinutes(5));
        otpRepository.save(otpRecord);
        return otp;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        try{
            OTP otpRecord = otpRepository.findByEmailAndOtp(email, otp);
            if (otpRecord == null || otpRecord.getExpiredAt().isBefore(LocalDateTime.now())) throw new Exception();
            otpRecord.setVerified(true);
            otpRepository.save(otpRecord);
            return true;
        } catch (Exception e) {
            System.out.println("OTP verification failed"+ e.getMessage());
        }
        return false;
    }

    @Override
    public boolean isOtpVerified(String email) {
        return otpRepository.existsByVerifiedIsTrueAndEmail(email);
    }
}
