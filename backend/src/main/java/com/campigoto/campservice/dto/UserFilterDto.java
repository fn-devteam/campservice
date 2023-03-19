package com.campigoto.campservice.dto;


import java.io.Serial;
import java.io.Serializable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserFilterDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String firstName;
    private String lastName;
    private String email;
}