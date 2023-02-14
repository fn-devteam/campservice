package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.SupplierDto;
import com.campigoto.campservice.entities.Supplier;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class SupplierMapper {

	public abstract SupplierDto toDTO(Supplier supplier);
	
	public abstract List<SupplierDto> toDTO(List<Supplier> suppliers);

	public abstract Supplier fromDTO(SupplierDto dto);
}
