package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "plant_pot")
@Data
@NoArgsConstructor
public class PlantPot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pot_id")
    private int potId;

    @Column(name = "pot_size")
    private String potSize;

    @Column(name = "pot_material")
    private String potMaterial;

    @Column(name = "pot_quantity_available")
    private int potQuantityAvailable;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @OneToMany(mappedBy = "plantPot", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<PlantingProcess> plantingProcessList;
}
