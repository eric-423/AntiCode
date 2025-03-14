package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "area")
@Data
@NoArgsConstructor
public class Area {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "area_id")
    private int areaId;

    @Column(name = "area_name", length = 50)
    private String areaName;

    @Column(name = "area_width")
    private float areaWidth;

    @Column(name = "area_length")
    private float areaLength;

    @Column(name = "area_extent")
    private float areaExtend;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "farm_id")
    private Farm farm;

    @OneToMany(mappedBy = "area", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<Location> locationList;

    @Column(name = "is_deleted")
    private boolean isDeleted;

}
