package com.sba.exam.sba.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sba.exam.sba.enums.TaskFrequency;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private int id;

    @Column(name = "create_at")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date createdAt;

    @Column(name = "start_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date startDate;

    @Column(name = "complete_at")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date completedAt;

    @Column(name = "task_description")
    private String description;

    @Column(name = "due_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dueDate;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "status_id")
    private TaskStatus taskStatus;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "type_id")
    private TaskType taskType;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
    private List<UserTask> userTasks;


    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "process_id")
    private PlantingProcess plantingProcess;


    @Column(name = "is_deleted")
    private boolean isDeleted;

    @Column(name = "task_name")
    private String taskName;

    @OneToMany(mappedBy = "task",fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private List<PlantingLocationTask> plantingLocationTasks;

    @Column(name = "task_frequency")
    @Enumerated(EnumType.STRING)
    private TaskFrequency frequency;
}
