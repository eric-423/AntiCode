package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Integer> {
    Role findRoleByName(String name);
}
