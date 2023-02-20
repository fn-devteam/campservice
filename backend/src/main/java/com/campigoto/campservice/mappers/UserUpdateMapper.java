package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.UserUpdateDto;
import com.campigoto.campservice.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class UserUpdateMapper {

	public abstract UserUpdateDto toDto(User user);
	
	public abstract List<UserUpdateDto> toDTO(List<User> users);

	public abstract User fromDTO(UserUpdateDto dto);
}
