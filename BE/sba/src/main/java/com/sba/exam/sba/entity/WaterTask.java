package com.sba.exam.sba.entity;

import com.sba.exam.sba.entity.keys.KeyWaterTask;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "water_task")
public class WaterTask {

    @EmbeddedId
    private KeyWaterTask id;

    @ManyToOne
    @JoinColumn(name = "task_id", insertable = false, updatable = false)
    private Task task;

    @ManyToOne
    @JoinColumn(name = "water_id", insertable = false, updatable = false)
    private Water water;

    @Column(name = "volume_available")
    private double volumeAvailable;
}
