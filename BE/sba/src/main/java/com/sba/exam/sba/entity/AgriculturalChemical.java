package com.sba.exam.sba.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "agricultural_chemical")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AgriculturalChemical {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chemical_id")
    private int id;

    @Column(name = "chemical_name")
    private String name;

    @Column(name = "chemical_description")
    private String description;

    @Column(name = "manufacturing_date")
    private Date manufacturingDate;

    @Column(name = "expiration_date")
    private Date expirationDate;

    @Column(name = "volume_available")
    private float volumeAvailable;
    
    @Column(name = "is_deleted")
    private boolean deleted;

    @OneToMany(mappedBy = "agriculturalChemical", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private Set<PlantingProcess> plantingProcessList;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "type_id")
    private ChemicalType chemicalTypes;
}
