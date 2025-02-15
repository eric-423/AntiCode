package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
@Table(name = "water")
public class Water {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "water_id")
    private int id;

    @Column(name = "water_name")
    private String waterName;

    @Column(name = "purity")
    private double purity;

    @Column(name = "pH_level")
    private double pHLevel;

    @Column(name = "volume_available")
    private double volumeAvailable;
}
