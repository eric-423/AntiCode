package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.RoleDTO;
import com.sba.exam.sba.entity.Role;
import com.sba.exam.sba.repository.RoleRepository;
import com.sba.exam.sba.service.imp.RoleServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleService implements RoleServiceImp {

    @Autowired
    RoleRepository repo;


    @Override
    public List<RoleDTO> getRoles() {
        List<RoleDTO> roleDTOs = new ArrayList<>();
        try {
            List<Role> role = repo.findAll();
            for (Role r : role) {
                RoleDTO roleDTO = new RoleDTO();
                roleDTO.setId(r.getId());
                roleDTO.setName(r.getName());
                roleDTOs.add(roleDTO);
            }
            return roleDTOs;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
