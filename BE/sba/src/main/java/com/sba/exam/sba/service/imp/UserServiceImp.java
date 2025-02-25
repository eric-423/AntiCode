package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.UserDTO;
import com.sba.exam.sba.entity.Users;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserServiceImp {
     boolean createUser(UserDTO userDTO);
     public List<UserDTO> getAllWorker();
     Users getUserById(int id);
}
