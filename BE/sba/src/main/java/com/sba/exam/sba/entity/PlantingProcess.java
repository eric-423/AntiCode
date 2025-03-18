package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "planting_process")
@Data
@NoArgsConstructor
public class PlantingProcess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "planting_process_id")
    private int id;


    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private Date createdAt;

    @OneToMany( mappedBy = "plantingProcess",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PlantMediumTask> plantMediumTasks;

    @OneToMany(mappedBy = "plantingProcess", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PlantPotTask> plantPotTasks;

    @OneToMany(mappedBy = "plantingProcess", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WaterTask> waterTasks;

    @OneToMany(mappedBy = "plantingProcess", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private Set<FarmingEquipmentTask> farmingEquipmentTasks;

    @OneToMany(mappedBy = "plantingProcess", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private Set<TaskAgriculturalChemical> taskAgriculturalChemicals;

    @OneToMany(mappedBy = "plantingProcess", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private Set<Task> taskSet;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "plant_id")
    private Plant plant;






}
