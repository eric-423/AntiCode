package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    Task findTaskById(int id);
}
