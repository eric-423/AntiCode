package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serial;
import java.util.Date;
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
    private Date createdAt;

    @Column(name = "complete_at")
    private Date completedAt;

    @Column(name = "task_description")
    private String description;

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

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private Set<FarmingEquipmentTask> farmingEquipmentTasks;
}
