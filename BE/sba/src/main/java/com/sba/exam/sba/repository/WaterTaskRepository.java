package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.WaterTask;
import com.sba.exam.sba.entity.keys.KeyWaterTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface WaterTaskRepository extends JpaRepository<WaterTask, KeyWaterTask> {
    List<WaterTask> getWaterTaskByWaterId(int waterId);

    List<WaterTask> getWaterTaskByWaterIdIn(List<Integer> waterIds);

    List<WaterTask> findWaterTaskByTask_Id(int taskId);
}
