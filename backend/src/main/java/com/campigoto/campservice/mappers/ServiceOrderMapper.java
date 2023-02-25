package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.ServiceOrderDto;
import com.campigoto.campservice.entities.ServiceOrder;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ServiceOrderMapper {

	public abstract ServiceOrderDto toDTO(ServiceOrder serviceOrder);
	
	public abstract List<ServiceOrderDto> toDTO(List<ServiceOrder> serviceOrders);

	public abstract ServiceOrder fromDTO(ServiceOrderDto dto);
}
