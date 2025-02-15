package com.sba.exam.sba.controller;

import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.service.imp.EmailServiceImp;
import com.sba.exam.sba.service.imp.OTPServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OTPController {

    @Autowired
    private OTPServiceImp otpService;

    @Autowired
    private EmailServiceImp emailService;

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestParam String email) {
        String otp = otpService.generateOtp(email);
        boolean isSent = emailService.sendOtpEmail(email, otp);
        ResponseData responseData = new ResponseData();
        responseData.setData( isSent ? "OTP sent successfully" : "Failed to send OTP");
        responseData.setStatus(isSent ? 200 : 400);
        return new ResponseEntity<>(responseData,isSent ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        boolean isVerified =  otpService.verifyOtp(email, otp);
        ResponseData responseData = new ResponseData();
        responseData.setData( isVerified ? "OTP is verified" : "Failed to verify OTP");
        responseData.setStatus(isVerified ? 200 : 400);
        return new ResponseEntity<>(responseData,isVerified ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }
}
