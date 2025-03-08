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
    @JoinColumn(name = "task_id", insertable = false, updatable = false)
    private Task task;

    @ManyToOne
    @JoinColumn(name = "chemical_id", insertable = false, updatable = false)
    private AgriculturalChemical agriculturalChemical;

    private float volumn;
}
