package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.CustomerDto;
import com.campigoto.campservice.entities.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class CustomerMapper {

	public abstract CustomerDto toDTO(Customer customer);
	
	public abstract List<CustomerDto> toDTO(List<Customer> customers);

	public abstract Customer fromDTO(CustomerDto dto);
}
