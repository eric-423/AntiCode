package com.sba.exam.sba.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "plant")
@NoArgsConstructor
@Data
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int plantId;

    @Column(name = "plant_name")
    private String plantName;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price")
    private float price;

    @Column(name = "size")
    private String size;

    @Column(name = "is_seed")
    private boolean isSeed;

    @Column(name = "species")
    private String species;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "characteristics")
    private String characteristics;

    @Column(name = "attracts")
    private String attracts;

    @Column(name = "hardiness")
    private String hardiness;

    @Column(name = "heat_zones")
    private String heatZones;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "plant_type_id")
    private PlantType plantType;

    @OneToMany(mappedBy = "plant", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<PlantingLocation> plantingLocationList;

    @OneToMany(mappedBy = "plant", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<PlantingProcess> plantingProcesses;
}
