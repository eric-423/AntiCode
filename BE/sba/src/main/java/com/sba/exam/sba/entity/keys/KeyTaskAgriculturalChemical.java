package com.sba.exam.sba.entity.keys;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;


@Embeddable
@Data
public class KeyTaskAgriculturalChemical implements Serializable {

    @Column(name = "process_id")
    private int process_id;

    @Column(name = "chemical_id")
    private int chemicalId;

}
