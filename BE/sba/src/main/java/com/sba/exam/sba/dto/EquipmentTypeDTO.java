package com.sba.exam.sba.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EquipmentTypeDTO {
    private int id;
    private String name;
    private String description;
    private boolean isDeleted;
}
