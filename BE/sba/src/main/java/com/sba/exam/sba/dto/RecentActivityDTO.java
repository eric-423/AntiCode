package com.sba.exam.sba.dto;


import lombok.Data;

import java.util.Date;

@Data
public class RecentActivityDTO {
    private int id;
    private String doer;
    private String description;
    private Date date;
    private int receiver;

}
