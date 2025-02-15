package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskStatusRepository extends JpaRepository<TaskStatus, Integer> {
    TaskStatus findTaskStatusById(int id);
}
