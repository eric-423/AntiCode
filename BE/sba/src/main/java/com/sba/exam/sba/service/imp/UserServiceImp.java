package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.UserDTO;
import com.sba.exam.sba.entity.Users;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserServiceImp {
    boolean createUser(UserDTO userDTO);

    List<UserDTO> getAllWorker();

    Users getUserById(int id);

    List<UserDTO> getAllUser();

    UserDTO addUserByAdmin(UserDTO userDTO);

    UserDTO updateUser(int id, UserDTO userDTO);

    UserDTO deleteUser(int id);
}
