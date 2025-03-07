package com.sba.exam.sba.scheduler;

import com.sba.exam.sba.repository.TaskRepository;
import com.sba.exam.sba.service.imp.EmailServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DeadlineReminder {

    @Autowired
    private EmailServiceImp emailService;

    @Autowired
    private TaskRepository taskRepository;

    @Scheduled(cron = "0 0 8 * * ?")
    public void autoMailReminderDueDate() {

    }
}
