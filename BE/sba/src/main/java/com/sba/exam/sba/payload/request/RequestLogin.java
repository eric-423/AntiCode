package com.sba.exam.sba.payload.request;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class RequestLogin {
    private String email;
    private String password;
}
