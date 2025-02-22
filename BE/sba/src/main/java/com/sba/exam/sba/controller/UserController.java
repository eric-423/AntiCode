package com.sba.exam.sba.controller;


import com.sba.exam.sba.dto.UserDTO;
import com.sba.exam.sba.entity.Users;
import com.sba.exam.sba.payload.ResponseData;
import com.sba.exam.sba.repository.UserRepository;
import com.sba.exam.sba.service.imp.LoginServiceImp;
import com.sba.exam.sba.service.imp.UserServiceImp;
import com.sba.exam.sba.untils.JwtTokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    LoginServiceImp loginServiceImp;

    @Autowired
    UserServiceImp userServiceImp;

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

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO userDTO){
        boolean isCreated = userServiceImp.createUser(userDTO);
        ResponseData responseData = new ResponseData();
        responseData.setData(isCreated ? "Successful" : "Failed");
        responseData.setStatus(isCreated ? 201: 400);
        return new ResponseEntity<>(responseData,isCreated ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST);
    }
}
