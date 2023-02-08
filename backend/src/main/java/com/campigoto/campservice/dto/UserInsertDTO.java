package com.campigoto.campservice.dto;

import com.campigoto.campservice.services.validation.UserInsertValid;

import java.io.Serial;

@UserInsertValid
public class UserInsertDTO extends UserDto {
	@Serial
	private static final long serialVersionUID = 1L;

	private String password;

	UserInsertDTO() {
		super();
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
