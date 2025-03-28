package com.sba.exam.sba.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "chemical_type")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class ChemicalType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "type_id")
    private int typeId;

    @Column(name = "type_name")
    private String typeName;

    @Column(name = "type_description")
    private String typeDescription;

    @Column(name = "is_deleted")
    private boolean isDeleted;

    @OneToMany(mappedBy = "chemicalTypes", fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Set<AgriculturalChemical> agriculturalChemicals;
}
