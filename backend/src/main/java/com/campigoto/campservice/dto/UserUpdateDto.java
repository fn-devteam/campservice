package com.campigoto.campservice.dto;

import com.campigoto.campservice.services.validation.UserUpdateValid;
import java.io.Serial;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@UserUpdateValid
public class UserUpdateDto extends UserDto {

    @Serial
    private static final long serialVersionUID = 1L;
}
