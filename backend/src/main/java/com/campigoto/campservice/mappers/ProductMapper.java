package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.ProductDto;
import com.campigoto.campservice.entities.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ProductMapper {

	public abstract ProductDto toDTO(Product product);
	
	public abstract List<ProductDto> toDTO(List<Product> products);

	public abstract Product fromDTO(ProductDto dto);
}
