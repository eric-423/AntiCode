package com.sba.exam.sba.service;

import com.sba.exam.sba.dto.RecentActivityDTO;
import com.sba.exam.sba.entity.RecentActivity;
import com.sba.exam.sba.repository.RecentActivityRepository;
import com.sba.exam.sba.repository.UserRepository;
import com.sba.exam.sba.service.imp.RecentActivityServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecentActivityService implements RecentActivityServiceImp {

    @Autowired
    private RecentActivityRepository recentActivityRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<RecentActivityDTO> getRecentActivityByUserId(int userId) {
        try{
            List<RecentActivity> recentActivities = recentActivityRepository.getRecentActivitiesByReceiver_Id(userId);
            List<RecentActivityDTO> recentActivityDTOs = new ArrayList<>();
            for (RecentActivity recentActivity : recentActivities) {
                RecentActivityDTO recentActivityDTO = new RecentActivityDTO();
                recentActivityDTO.setId(recentActivity.getId());
                recentActivityDTO.setDate(recentActivity.getDate());
                recentActivityDTO.setDescription(recentActivity.getDescription());
                recentActivityDTO.setDoer(recentActivity.getDoer().getUserName());
                recentActivityDTO.setReceiver(recentActivity.getReceiver().getId());
                recentActivityDTOs.add(recentActivityDTO);
            }
            return recentActivityDTOs;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<RecentActivityDTO> getRecentActivityByManager() {
        try{
            List<RecentActivity> recentActivities = recentActivityRepository.
                    getRecentActivitiesByDoerNotIn(userRepository.getUsersByRole_Name("Manager"));
            List<RecentActivityDTO> recentActivityDTOs = new ArrayList<>();
            for (RecentActivity recentActivity : recentActivities) {
                RecentActivityDTO recentActivityDTO = new RecentActivityDTO();
                recentActivityDTO.setId(recentActivity.getId());
                recentActivityDTO.setDate(recentActivity.getDate());
                recentActivityDTO.setDescription(recentActivity.getDescription());
                recentActivityDTO.setDoer(recentActivity.getDoer().getUserName());
                recentActivityDTO.setReceiver(recentActivity.getReceiver().getId());
                recentActivityDTOs.add(recentActivityDTO);
            }
            return recentActivityDTOs;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
