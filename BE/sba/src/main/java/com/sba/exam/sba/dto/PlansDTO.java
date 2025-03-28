package com.sba.exam.sba.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PlansDTO {
    private Date startHarvest;
    private Date endHarvest;
    private String namePlans;
    private long plans;
    private String farm;
    private String area;
    private List<String> locations;
}
