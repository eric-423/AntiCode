package com.sba.exam.sba.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    @Column(name = "user_name", length = 30)
    private String userName;

    @Column(name = "user_address", length = 50)
    private String userAddress;

    @Column(name = "user_phone_number", length = 15)
    private String userPhoneNumber;

    @Column(name = "user_email", length = 50)
    private String userEmail;

    @Column(name = "user_password", length = 100)
    private String passWord;

    @Column(name = "user_date_of_birth")
    private Date userDateOfBirth;

    @Column(name = "is_busy")
    private boolean isBusy;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH
    })
    @JoinColumn(name = "role_id")
    private Role role;
}
