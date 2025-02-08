package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "plant_type")
@Data
@NoArgsConstructor
public class PlantType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plant_type_id")
    private int plantTypeId;

    @Column(name = "plant_type_name", length = 50)
    private String plantTypeName;

    @Column(name = "type_description", columnDefinition = "TEXT")
    private String typeDescription;

    @OneToMany(mappedBy = "plantType", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<Plant> plantList;

}
