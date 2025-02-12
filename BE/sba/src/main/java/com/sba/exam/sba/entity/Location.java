package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "location")
@Data
@NoArgsConstructor
public class Location {

    @Id
    private int locationId;

    @Column(name = "location_extent")
    private float locationExtent;

    @Column(name = "location_name")
    private String locationName;

    @ManyToOne(cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    @JoinColumn(name = "area_id")
    private Area area;

    @OneToMany(mappedBy = "location", fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH
    })
    private List<PlantingLocation> plantingLocationList;
}
