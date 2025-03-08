package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "plant_pot_task")
public class PlantPotTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private PlantPot plantPot;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Task task;

    private int quantity;
}
