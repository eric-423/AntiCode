package com.sba.exam.sba.controller;

import com.sba.exam.sba.service.imp.RoleServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("roles")
public class RoleController {

    @Autowired
    RoleServiceImp roleService;

    @GetMapping("")
    public ResponseEntity<?> getAllRoles() {
        try {
            return new ResponseEntity<>(roleService.getRoles(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
