package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.UserDTO;
import com.sba.exam.sba.entity.Role;
import com.sba.exam.sba.entity.Users;
import com.sba.exam.sba.repository.RoleRepository;
import com.sba.exam.sba.repository.UserRepository;
import com.sba.exam.sba.service.imp.OTPServiceImp;
import com.sba.exam.sba.service.imp.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceImp {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OTPServiceImp  OTPServiceImp;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public boolean createUser(UserDTO userDTO) {
        try{
//            boolean isVerified =OTPServiceImp.isOtpVerified(userDTO.getEmail());
//            if(!isVerified ) throw new Exception();
            Users user = new Users();
            user.setUserEmail(userDTO.getEmail());
            user.setUserName(userDTO.getUserName());
            user.setPassWord(passwordEncoder.encode(userDTO.getPassword()));
            Role role = roleRepository.findRoleByName("Manager");
            user.setRole(role);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            System.out.println("Error creating user" + e.getMessage());
        }
        return false;
    }
}
