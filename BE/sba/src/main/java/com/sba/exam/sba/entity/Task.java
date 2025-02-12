package com.sba.exam.sba.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "task")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private int id;

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "complete_at")
    private Date completeAt;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "task")
    private Set<TaskAgriculturalChemical> taskAgriculturalChemicals;
}
