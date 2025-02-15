package com.sba.exam.sba.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.io.Serializable;

@Data
public class Water_Task_Id implements Serializable {
    @JsonIgnore
    private Task task;

    @JsonIgnore
    private Water water;
}
