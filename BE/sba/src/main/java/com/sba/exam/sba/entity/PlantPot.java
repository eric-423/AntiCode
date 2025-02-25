package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "plant_pot")
@Data
@NoArgsConstructor
public class PlantPot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pot_id")
    private int potId;

    @Column(name = "pot_name")
    private String potSize;

    @Column(name = "pot_material")
    private String potMaterial;

    @Column(name = "pot_quantity_available")
    private int potQuantityAvailable;
}
