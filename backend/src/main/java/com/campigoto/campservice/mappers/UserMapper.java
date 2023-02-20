package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.UserDto;
import com.campigoto.campservice.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class UserMapper {

	public abstract UserDto toDto(User user);
	
	public abstract List<UserDto> toDTO(List<User> users);

	public abstract User fromDTO(UserDto dto);
}
