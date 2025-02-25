package com.sba.exam.sba.service;

import com.sba.exam.sba.entity.Users;
import com.sba.exam.sba.repository.UserRepository;
import com.sba.exam.sba.service.imp.LoginServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements LoginServiceImp {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public boolean checkLogin(String email, String password) {
        Users users = userRepository.findByUserEmail(email);
        boolean checklogin = false;

        if (users != null) {
            if (passwordEncoder.matches(password, users.getPassWord())) {
                checklogin = true;
            }
        }
        return checklogin;
    }
}
