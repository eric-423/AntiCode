package com.sba.exam.sba.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "equipment_type")
public class EquipmentType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private int id;

    @Column(name = "type_name")
    private String name;

    @Column(name = "type_description")
    private String description;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @OneToMany(mappedBy = "equipmentType", fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    Set<FarmingEquipment> farmingEquipments;
}
