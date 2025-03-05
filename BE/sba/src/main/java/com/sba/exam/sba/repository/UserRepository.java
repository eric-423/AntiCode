package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.UserTask;
import com.sba.exam.sba.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUserEmail(String userEmail);

    List<Users> getUsersByRole_Name(String roleName);

    @Query("SELECT u FROM Users u WHERE NOT u.id in (:userTasksID)")
    List<Users> getUsersUnAssignedByUserTasks(@Param("userTasksID") List<Integer> userTasksID);

    Users findByUserPhoneNumber(String userPhoneNumber);


}
