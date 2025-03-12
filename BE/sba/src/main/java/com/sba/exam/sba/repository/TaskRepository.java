package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    Task findTaskById(int id);

    List<Task> findTasksByTaskStatus_Id(int taskStatusId);

    @Query("SELECT t FROM Task t JOIN t.userTasks ut WHERE ut.user.id = :userId AND t.taskStatus.id = :statusId")
    List<Task> findTasksByUserID(@Param("userId") int userId, @Param("statusId") int statusId);

    List<Task> findTasksByTaskType_Id(int taskTypeId);

    List<Task> getTasksByDueDate(LocalDate dueDate);
}
