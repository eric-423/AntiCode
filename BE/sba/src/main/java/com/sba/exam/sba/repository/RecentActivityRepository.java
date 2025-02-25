package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.RecentActivity;
import com.sba.exam.sba.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface RecentActivityRepository extends JpaRepository<RecentActivity, Integer> {
    List<RecentActivity> getRecentActivitiesByReceiver_Id(int receiverId);

    List<RecentActivity> getRecentActivitiesByDoerNotIn(Collection<Users> doers);
}
