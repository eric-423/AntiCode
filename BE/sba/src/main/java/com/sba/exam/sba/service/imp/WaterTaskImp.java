package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.entity.WaterTask;

import java.util.List;

public interface WaterTaskImp {
    public List<WaterTask> getWaterTasks();
    public WaterTask addWaterTask(WaterTask waterTask);
}
