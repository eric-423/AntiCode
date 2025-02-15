package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.UserDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserServiceImp {
     boolean createUser(UserDTO userDTO);
}
