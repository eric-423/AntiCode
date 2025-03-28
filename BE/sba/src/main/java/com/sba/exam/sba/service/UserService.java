package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.UserDTO;
import com.sba.exam.sba.entity.Role;
import com.sba.exam.sba.entity.Users;
import com.sba.exam.sba.repository.OTPRepository;
import com.sba.exam.sba.repository.RoleRepository;
import com.sba.exam.sba.repository.UserRepository;
import com.sba.exam.sba.service.imp.OTPServiceImp;
import com.sba.exam.sba.service.imp.UserServiceImp;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserServiceImp {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OTPServiceImp OTPServiceImp;

    @Autowired
    private OTPRepository otpRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public boolean createUser(UserDTO userDTO) {
        try {
            boolean isVerified = otpRepository.findByPhoneNumber(userDTO.getPhoneNumber()).getLast().isVerified();
            if (!isVerified) throw new Exception();
            Users user = new Users();
            user.setUserEmail(userDTO.getEmail());
            user.setUserName(userDTO.getUserName());
            user.setUserPhoneNumber(userDTO.getPhoneNumber());
            user.setPassWord(passwordEncoder.encode(userDTO.getPassword()));
            user.setVerified(false);
            user.setDeleted(false);
            Role role = roleRepository.findRoleByNameIgnoreCase("Worker");
            user.setRole(role);
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            System.out.println("Error creating user" + e.getMessage());
        }
        return false;
    }

    @Override
    public List<UserDTO> getAllWorker() {
        List<Users> users = userRepository.getUsersByRole_Name("Worker");
        List<UserDTO> userDTOs = new ArrayList<>();
        for (Users user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(user.getUserName());
            userDTO.setEmail(user.getUserEmail());
            userDTO.setId(user.getId());
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    @Override
    public Users getUserById(int id) {
        return userRepository.findById(id).isPresent() ? userRepository.findById(id).get() : null;
    }

    @Override
    public List<UserDTO> getAllUser() {
        List<UserDTO> dtos = new ArrayList<>();
        List<Users> users = userRepository.findAll();
        for (Users user : users) {
            if (!user.isDeleted()) {
                UserDTO userDTO = new UserDTO();
                userDTO.setUserName(user.getUserName());
                userDTO.setEmail(user.getUserEmail());
                userDTO.setId(user.getId());
                userDTO.setRole(user.getRole().getName());
                userDTO.setAddress(user.getUserAddress());
                userDTO.setDateOfBirth(user.getUserDateOfBirth());
                userDTO.setPhoneNumber(user.getUserPhoneNumber());
                userDTO.setBusy(user.isBusy());
                dtos.add(userDTO);
            }
        }
        return dtos;
    }

    @Override
    public List<UserDTO> getAllManager() {
        List<Users> users = userRepository.getUsersByRole_Name("Manager");
        List<UserDTO> userDTOs = new ArrayList<>();
        for (Users user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(user.getUserName());
            userDTO.setEmail(user.getUserEmail());
            userDTO.setId(user.getId());
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }


    @Transactional
    @Override
    public UserDTO addUserByAdmin(UserDTO userDTO) {
        try {
            List<Users> users = userRepository.findAll();
            for (Users u : users) {
                if (u.getUserEmail().equals(userDTO.getEmail())) {
                    throw new Exception("This Email is already in farm");
                }
            }
            Users user = new Users();
            user.setUserEmail(userDTO.getEmail());
            user.setUserName(userDTO.getUserName());
            user.setPassWord(passwordEncoder.encode(userDTO.getPassword()));
            Role role = roleRepository.findRoleByNameIgnoreCase(userDTO.getRole());
            user.setRole(role);
            user.setUserAddress(userDTO.getAddress());
            user.setUserDateOfBirth(userDTO.getDateOfBirth());
            user.setUserPhoneNumber(userDTO.getPhoneNumber());
            user.setBusy(false);
            user.setDeleted(false);
            userRepository.save(user);
            return userDTO;
        } catch (Exception e) {
            System.out.println("Error creating user" + e.getMessage());
        }
        return null;
    }

    @Override
    public UserDTO updateUser(int id, UserDTO userDTO) {
        try {
            Users user = userRepository.findById(id).get();
            user.setUserName(userDTO.getUserName());
            user.setUserEmail(userDTO.getEmail());
            user.setUserAddress(userDTO.getAddress());
            user.setUserDateOfBirth(userDTO.getDateOfBirth());
            user.setUserPhoneNumber(userDTO.getPhoneNumber());
            user.setBusy(userDTO.isBusy());
            if (userDTO.getPassword() != null) {
                user.setPassWord(passwordEncoder.encode(userDTO.getPassword()));
            }
            Role role = roleRepository.findRoleByNameIgnoreCase(userDTO.getRole());
            user.setRole(role);
            userRepository.save(user);
            return userDTO;
        } catch (Exception e) {
            System.out.println("Error updating user" + e.getMessage());
        }
        return null;
    }

    @Override
    public UserDTO deleteUser(int id) {
        try {
            Users user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            if (!user.getRole().getName().equalsIgnoreCase("Manager") && !user.getRole().getName().equalsIgnoreCase("Admin")) {
                user.setDeleted(true);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Cannot delete manager or admin");
            }

            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(user.getUserName());
            userDTO.setEmail(user.getUserEmail());
            userDTO.setId(user.getId());
            userDTO.setRole(user.getRole().getName());
            userDTO.setAddress(user.getUserAddress());
            userDTO.setDateOfBirth(user.getUserDateOfBirth());
            userDTO.setPhoneNumber(user.getUserPhoneNumber());
            userDTO.setBusy(user.isBusy());
            return userDTO;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
