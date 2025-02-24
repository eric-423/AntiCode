package com.sba.exam.sba.entity;


import com.sba.exam.sba.entity.keys.KeyFarmingEquipmentTask;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "farming_equipment_task")
public class FarmingEquipmentTask {

    @EmbeddedId
    private KeyFarmingEquipmentTask id;

    @ManyToOne
    @JoinColumn(name = "equipment_id", insertable = false, updatable = false)
    private FarmingEquipment farmingEquipment;

    @ManyToOne
    @JoinColumn(name = "task_id", insertable = false, updatable = false)
    private Task task;

}
