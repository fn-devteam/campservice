package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.OrderDetailDto;
import com.campigoto.campservice.entities.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class OrderDetailMapper {

	public abstract OrderDetailDto toDTO(OrderDetail orderDetail);
	
	public abstract List<OrderDetailDto> toDTO(List<OrderDetail> orderDetails);

	public abstract OrderDetail fromDTO(OrderDetailDto dto);
}
