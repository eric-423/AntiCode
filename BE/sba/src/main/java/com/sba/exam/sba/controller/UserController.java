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
            responseData.setStatus(400);
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO userDTO) {
        boolean isCreated = userServiceImp.createUser(userDTO);
        ResponseData responseData = new ResponseData();
        responseData.setData(isCreated ? "Successful" : "Failed");
        responseData.setStatus(isCreated ? 201 : 400);
        return new ResponseEntity<>(responseData, isCreated ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/workers")
    public ResponseEntity<?> getAllWorker() {
        return new ResponseEntity<>(userServiceImp.getAllWorker(), HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUser() {
        try {
            return new ResponseEntity<>(userServiceImp.getAllUser(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("")
    public ResponseEntity<?> createUserByAdmin(@RequestBody UserDTO userDTO) {
        try {
            return new ResponseEntity<>(userServiceImp.addUserByAdmin(userDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserDTO userDTO) {
        try {
            return new ResponseEntity<>(userServiceImp.updateUser(id, userDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
            try {
                return new ResponseEntity<>(userServiceImp.deleteUser(id), HttpStatus.OK);
            }catch (Exception e){
                e.printStackTrace();
            }

        return null;
    }

}
