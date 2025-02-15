package com.sba.exam.sba.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "water_task")
@IdClass(Water_Task_Id.class)
public class WaterTask {
    @ManyToOne
    @JoinColumn(name = "task_id")
    @Id
    Task task;

    @ManyToOne
    @JoinColumn(name = "water_id")
    @Id
    Water water;

    @Column(name = "volume_available")
    private double volumeAvailable;
}
