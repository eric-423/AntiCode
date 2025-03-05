package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Integer> {
    OTP findByPhoneNumberAndOtp(String phoneNumber, String otp);

    List<OTP> findByPhoneNumber(String phoneNumber);


}
