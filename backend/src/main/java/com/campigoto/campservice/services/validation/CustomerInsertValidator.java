package com.campigoto.campservice.services.validation;

import com.campigoto.campservice.dto.CustomerDto;
import com.campigoto.campservice.entities.Customer;
import com.campigoto.campservice.entities.enums.PersonType;
import com.campigoto.campservice.repositories.CustumerRepository;
import com.campigoto.campservice.resources.exceptions.FieldMessage;
import com.campigoto.campservice.services.validation.utils.BR;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

public class CustomerInsertValidator implements ConstraintValidator<CustomerInsert, CustomerDto> {
	
	@Autowired
	private CustumerRepository repo;

	@Override
	public void initialize(CustomerInsert ann) {
	}

	@Override
	public boolean isValid(CustomerDto objDto, ConstraintValidatorContext context) {

		List<FieldMessage> list = new ArrayList<>();

		if (objDto.getPersonTypes().equals(PersonType.FISICA.getCod()) && !BR.isValidCPF(objDto.getCpfCnpj())) {
			list.add(new FieldMessage("cpfCnpj", "CPF inválido"));
		}

		if (objDto.getPersonTypes().equals(PersonType.JURIDICA.getCod()) && !BR.isValidCNPJ(objDto.getCpfCnpj())) {
			list.add(new FieldMessage("cpfCnpj", "CNPJ inválido"));
		}

		Customer aux = repo.findByEmail(objDto.getGetEmailAddress());
		if (aux != null) {
			list.add(new FieldMessage("email", "Email já existente"));
		}

		
		for (FieldMessage e : list) {
			context.disableDefaultConstraintViolation();
			context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
					.addConstraintViolation();
		}
		return list.isEmpty();
	}
}