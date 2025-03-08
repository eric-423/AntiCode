package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "plant_medium_task")
public class PlantMediumTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private PlantMedium plantMedium;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Task task;

    private float mediumWeight;
}
