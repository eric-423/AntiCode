package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "farm")
@NoArgsConstructor
@Data
public class Farm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "farm_id")
    private int farmId;

    @Column(name = "farm_name", length = 50)
    private String farmName;

    @Column(name = "farm_length")
    private float farmLength;

    @Column(name = "farm_width")
    private float farmWidth;

    @Column(name = "farm_extent")
    private float farmExtend;

    @Column(name = "farm_address")
    private String farmAddress;

    @OneToMany(mappedBy = "farm", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<Area> areaList;


}
