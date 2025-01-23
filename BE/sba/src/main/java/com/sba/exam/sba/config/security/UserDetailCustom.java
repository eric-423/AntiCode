package com.sba.exam.sba.config.security;

import com.sba.exam.sba.entity.Users;
import com.sba.exam.sba.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class UserDetailCustom implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users users = userRepository.findByUserEmail(email);
        if(users==null){
            throw new UsernameNotFoundException("User can's exits");
        } else{
            return new User(email,users.getPassWord(), new ArrayList<>());
        }
    }
}
