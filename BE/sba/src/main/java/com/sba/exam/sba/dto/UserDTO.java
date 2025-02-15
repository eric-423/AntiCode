package com.sba.exam.sba.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
    private String userName;
    private String password;
    private String email;
}
