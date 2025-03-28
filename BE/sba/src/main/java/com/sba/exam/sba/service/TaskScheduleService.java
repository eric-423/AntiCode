package com.sba.exam.sba.service;

import com.sba.exam.sba.entity.Task;
import com.sba.exam.sba.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class TaskScheduleService {

    @Autowired
    private TaskRepository taskRepository;

    @Scheduled(cron = "0 0 5 * * ?")
    public void scheduleDailyTasks() {
        LocalDateTime now = LocalDateTime.now();
        List<Task> tasks = taskRepository.findAll();

        for (Task task : tasks) {
            LocalDate taskStartDate = task.getStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            if (!now.toLocalDate().isBefore(taskStartDate)) {
                switch (task.getFrequency()) {
                    case DAILY -> createNewTaskFromExisting(task);
                    case WEEKLY -> {
                        if (now.getDayOfWeek() == taskStartDate.getDayOfWeek()) {
                            createNewTaskFromExisting(task);
                        }
                    }
                    case MONTHLY -> {
                        int lastDayOfMonth = now.getMonth().length(now.toLocalDate().isLeapYear());
                        if (now.getDayOfMonth() == Math.min(taskStartDate.getDayOfMonth(), lastDayOfMonth)) {
                            createNewTaskFromExisting(task);
                        }
                    }
                }
            }
        }
    }

    private void createNewTaskFromExisting(Task existingTask) {
        Task newTask = new Task();
        newTask.setCreatedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
        newTask.setTaskName(existingTask.getTaskName());
        newTask.setTaskStatus(existingTask.getTaskStatus());
        newTask.setTaskType(existingTask.getTaskType());
        newTask.setFrequency(existingTask.getFrequency());
        newTask.setDeleted(false);
        newTask.setDescription(existingTask.getDescription());

        LocalDateTime newStartDate = LocalDateTime.now().plusDays(1);
        newTask.setStartDate(Date.from(newStartDate.atZone(ZoneId.systemDefault()).toInstant()));

        if (existingTask.getDueDate() != null) {
            LocalDate newDueDate = existingTask.getDueDate();
            switch (existingTask.getFrequency()) {
                case DAILY -> newDueDate = newDueDate.plusDays(1);
                case WEEKLY -> newDueDate = newDueDate.plusWeeks(1);
                case MONTHLY -> newDueDate = newDueDate.plusMonths(1);
            }
            newTask.setDueDate(newDueDate);
        }

        taskRepository.save(newTask);
    }
}
