package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepository extends JpaRepository<Role,Integer> {
    Role findRoleByNameIgnoreCase(String name);


}
