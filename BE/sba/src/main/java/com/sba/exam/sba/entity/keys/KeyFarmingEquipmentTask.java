package com.sba.exam.sba.entity.keys;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class KeyFarmingEquipmentTask {
    @Column(name = "equipment_id")
    private int equipmentId;

    @Column(name = "task_id")
    private int taskId;
}
