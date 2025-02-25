package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTaskRepository extends JpaRepository<UserTask, Integer> {
    void deleteUserTaskByUser_IdAndTask_Id(int userId, int taskId);
}
