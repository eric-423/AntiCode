package com.sba.exam.sba.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class FarmingEquipmentDTO {
    private int id;

    private String name;

    private String description;

    private int quantity;

    private boolean inUsed;

    private boolean isDamaged;

    private String typeName;

    private boolean isDeleted;

}
