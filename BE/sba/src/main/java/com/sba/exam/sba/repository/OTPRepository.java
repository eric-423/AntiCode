package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Integer> {
    OTP findByEmailAndOtp(String email, String otp);

    boolean existsByVerifiedIsTrueAndEmail(String email);
}
