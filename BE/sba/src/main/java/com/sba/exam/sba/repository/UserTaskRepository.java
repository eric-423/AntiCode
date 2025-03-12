package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.UserTask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTaskRepository extends JpaRepository<UserTask, Integer> {
    void deleteUserTaskByUser_IdAndTask_Id(int userId, int taskId);

    List<UserTask> getUserTasksById(Long id);
}
