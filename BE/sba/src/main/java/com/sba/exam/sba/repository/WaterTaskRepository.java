package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.WaterTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaterTaskRepository extends JpaRepository<WaterTask, Integer> {
    List<WaterTask> getWaterTaskByWaterId(int waterId);
    List<WaterTask> getWaterTasksByTaskId(int taskId);
    WaterTask getWaterTaskByWaterIdAndTaskId(int waterId, int taskId);
}
