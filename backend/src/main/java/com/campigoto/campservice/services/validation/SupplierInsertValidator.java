package com.campigoto.campservice.services.validation;

import com.campigoto.campservice.dto.CustomerDto;
import com.campigoto.campservice.dto.SupplierDto;
import com.campigoto.campservice.entities.Customer;
import com.campigoto.campservice.entities.Supplier;
import com.campigoto.campservice.entities.enums.PersonType;
import com.campigoto.campservice.repositories.SupplierRepository;
import com.campigoto.campservice.resources.exceptions.FieldMessage;
import com.campigoto.campservice.services.validation.utils.BR;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

public class SupplierInsertValidator implements ConstraintValidator<SupplierInsert, SupplierDto> {
	
	@Autowired
	private SupplierRepository repo;

	@Override
	public void initialize(SupplierInsert ann) {
	}

	@Override
	public boolean isValid(SupplierDto objDto, ConstraintValidatorContext context) {

		List<FieldMessage> list = new ArrayList<>();

		if (objDto.getPersonType().equals(PersonType.FISICA.getCod()) && !BR.isValidCPF(objDto.getCpfCnpj())) {
			list.add(new FieldMessage("cpfCnpj", "CPF inválido"));
		}

		if (objDto.getPersonType().equals(PersonType.JURIDICA.getCod()) && !BR.isValidCNPJ(objDto.getCpfCnpj())) {
			list.add(new FieldMessage("cpfCnpj", "CNPJ inválido"));
		}

		Supplier aux = repo.findByEmailAddress(objDto.getEmailAddress());
		if (aux != null) {
			list.add(new FieldMessage("emailAddress", "Email já existente"));
		}

		
		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}