package com.sba.exam.sba.entity.keys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.io.Serializable;

@Embeddable
@Data
public class KeyWaterTask implements Serializable {
    @Column(name = "task_id")
    private int taskId;

    @Column(name = "water_id")
    private int waterId;
}
