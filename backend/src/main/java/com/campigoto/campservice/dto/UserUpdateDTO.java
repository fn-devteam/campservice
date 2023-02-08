package com.campigoto.campservice.dto;

import com.campigoto.campservice.services.validation.UserUpdateValid;
import java.io.Serial;

@UserUpdateValid
public class UserUpdateDTO extends UserDto {
	@Serial
	private static final long serialVersionUID = 1L;

}
