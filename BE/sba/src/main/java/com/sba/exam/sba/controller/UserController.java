package com.sba.exam.sba.controller;


import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.repository.UserRepository;
import com.sba.exam.sba.service.imp.LoginServiceImp;
import com.sba.exam.sba.untils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    LoginServiceImp loginServiceImp;

    @Autowired
    JwtTokenHelper jwtTokenHelper;

    @Autowired
    UserRepository usersRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestParam String email, @RequestParam String password) {
        ResponseData responseData = new ResponseData();
        boolean checkLogin = loginServiceImp.checkLogin(email, password);
        String token;

        if (checkLogin) {
            token = jwtTokenHelper.generateToken(usersRepository.findByUserEmail(email));
            responseData.setData(token);
        } else {
            responseData.setData("");
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}
