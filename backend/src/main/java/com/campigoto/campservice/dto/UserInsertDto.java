package com.campigoto.campservice.dto;

import com.campigoto.campservice.services.validation.UserInsertValid;
import java.io.Serial;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@UserInsertValid
public class UserInsertDto extends UserDto {

    @Serial
    private static final long serialVersionUID = 1L;

    private String password;
}
