package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "plant_medium")
@Data
@NoArgsConstructor
public class PlantMedium {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medium_id")
    private int mediumId;

    @Column(name = "medium_name")
    private String mediumName;

    @Column(name = "description")
    private String description;

    @Column(name = "medium_weight_avallable")
    private int mediumWeightAvailable;

    @Column(name = "is_deleted")
    private boolean isDeleted;


    @OneToMany(mappedBy = "plantMedium", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<PlantingProcess> plantingProcessList;
}
