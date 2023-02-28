package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.StockEntryDto;
import com.campigoto.campservice.entities.StockEntry;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class StockEntryMapper {

	public abstract StockEntryDto toDTO(StockEntry stockEntry);
	
	public abstract List<StockEntryDto> toDTO(List<StockEntry> stockEntries);

	public abstract StockEntry fromDTO(StockEntryDto dto);
}
