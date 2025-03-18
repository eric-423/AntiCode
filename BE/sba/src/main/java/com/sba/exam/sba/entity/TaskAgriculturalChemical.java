package com.sba.exam.sba.entity;

import com.sba.exam.sba.entity.keys.KeyTaskAgriculturalChemical;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "task_agricultural_chemical")

public class TaskAgriculturalChemical {

    @EmbeddedId
    private KeyTaskAgriculturalChemical id;

    @ManyToOne
    @JoinColumn(name = "process_id", insertable = false, updatable = false)
    private PlantingProcess plantingProcess;

    @ManyToOne
    @JoinColumn(name = "chemical_id", insertable = false, updatable = false)
    private AgriculturalChemical agriculturalChemical;

    private float volumn;
}
