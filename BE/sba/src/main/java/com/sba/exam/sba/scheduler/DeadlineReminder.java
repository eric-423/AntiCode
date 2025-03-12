package com.sba.exam.sba.scheduler;

import com.sba.exam.sba.entity.Task;
import com.sba.exam.sba.entity.UserTask;
import com.sba.exam.sba.repository.TaskRepository;
import com.sba.exam.sba.repository.UserTaskRepository;
import com.sba.exam.sba.service.imp.EmailServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DeadlineReminder {

    @Autowired
    private EmailServiceImp emailService;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserTaskRepository userTaskRepository;

    @Scheduled(cron = "0 0 8 * * ?")
    public void autoMailReminderDueDate() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<Task> tasks = taskRepository.getTasksByDueDate(tomorrow);
        tasks.forEach(task -> {
            String subject = "Reminder: Task '" + task.getTaskType().getTypeName() + "' due tomorrow!";
            String body = "Task '" + task.getTaskType().getTypeName() + "' is due on " + task.getDueDate() + ".";
            List<UserTask> userTasks = userTaskRepository.getUserTasksById((long) task.getId());
            userTasks.forEach(userTask -> {
                emailService.sendMail(userTask.getUser().getUserEmail(), subject, body);
            });
        });
    }
}
