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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int locationId;

    @Column(name = "location_extent")
    private float locationExtent;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "location_width")
    private float locationWidth;

    @Column(name = "location_length")
    private float locationLength;

    @Column(name = "is_planted")
    private boolean isPlanted;

    @Column(name = "is_deleted")
    private boolean isDeleted;

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
