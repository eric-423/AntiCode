package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUserEmail(String userEmail);


}
