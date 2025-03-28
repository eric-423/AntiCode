package com.sba.exam.sba.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PlansDTO {

    private Date startHarvest;

    private Date endHarvest;

    private String namePlans;

    private long plans;
}
