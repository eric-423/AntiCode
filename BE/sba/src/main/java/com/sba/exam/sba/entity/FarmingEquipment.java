package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "farming_equipment")

public class FarmingEquipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipment_id")
    private int id;


    @Column(name = "equipment_name")
    private String name;

    @Column(name = "equipment_description")
    private String description;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "in_used")
    private boolean inUsed;

    @Column(name = "is_damaged")
    private boolean isDamaged;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "type_id")
    EquipmentType equipmentType;

    @OneToMany(mappedBy = "farmingEquipment", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private Set<PlantingProcess> plantingProcesses;

}
