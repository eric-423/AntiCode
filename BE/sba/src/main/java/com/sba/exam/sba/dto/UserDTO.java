package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class UserDTO {
    private int id;
    private String userName;
    private String password;
    private String email;
    private String address;
    private Date dateOfBirth;
    private String phoneNumber;
    private boolean isBusy;
    private String role;
}
