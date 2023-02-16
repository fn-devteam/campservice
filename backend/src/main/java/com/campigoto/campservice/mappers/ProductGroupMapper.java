package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.ProductGroupDto;
import com.campigoto.campservice.entities.ProductGroup;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ProductGroupMapper {

	public abstract ProductGroupDto toDTO(ProductGroup productGroup);
	
	public abstract List<ProductGroupDto> toDTO(List<ProductGroup> productGroup);

	public abstract ProductGroup fromDTO(ProductGroupDto dto);
}
