package com.campigoto.campservice.mappers;


import com.campigoto.campservice.dto.EntryDetailDto;
import com.campigoto.campservice.entities.EntryDetail;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class EntryDetailMapper {

	public abstract EntryDetail toDTO(EntryDetail entryDetail);
	
	public abstract List<EntryDetailDto> toDTO(List<EntryDetail> entryDetails);

	public abstract EntryDetail fromDTO(EntryDetailDto dto);
}
