package com.sba.exam.sba.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class FarmDTO implements Serializable {
    private int farmId;

    private String farmName;

    private float farmExtend;

    private String farmAddress;

    private float farmLength;

    private float farmWidth;


}
