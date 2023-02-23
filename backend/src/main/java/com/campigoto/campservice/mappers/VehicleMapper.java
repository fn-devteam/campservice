package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.VehicleDto;
import com.campigoto.campservice.entities.Vehicle;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class VehicleMapper {

	public abstract VehicleDto toDTO(Vehicle vehicle);
	
	public abstract List<VehicleDto> toDTO(List<Vehicle> vehicles);

	public abstract Vehicle fromDTO(VehicleDto dto);
}
