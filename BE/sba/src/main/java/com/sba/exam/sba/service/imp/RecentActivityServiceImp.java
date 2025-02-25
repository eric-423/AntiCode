package com.sba.exam.sba.service.imp;

import com.sba.exam.sba.dto.RecentActivityDTO;
import com.sba.exam.sba.entity.RecentActivity;

import java.util.List;

public interface RecentActivityServiceImp {
    public List<RecentActivityDTO> getRecentActivityByUserId(int userId);

    public List<RecentActivityDTO> getRecentActivityByManager();
}
