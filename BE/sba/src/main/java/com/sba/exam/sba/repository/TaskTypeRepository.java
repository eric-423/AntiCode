package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.TaskType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTypeRepository extends JpaRepository<TaskType, Integer> {
    TaskType findTaskTypeById(int id);
}
