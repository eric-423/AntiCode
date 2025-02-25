package com.sba.exam.sba.dto;


import lombok.Data;

import java.util.Date;


@Data

public class ChemicalDTO {

    private int id;

    private String name;

    private String description;

    private Date manufacturingDate;

    private Date expirationDate;

    private float volumeAvailable;

    private String chemicalType;

    private boolean deleted;

}
