package com.campigoto.campservice.services.validation;

import com.campigoto.campservice.dto.CustomerDto;
import com.campigoto.campservice.entities.Customer;
import com.campigoto.campservice.repositories.CustumerRepository;
import com.campigoto.campservice.resources.exceptions.FieldMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CustomerUpdateValidator implements ConstraintValidator<CustomerUpdate, CustomerDto> {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private CustumerRepository repo;

	@Override
	public void initialize(CustomerUpdate ann) {
	}

	@Override
	public boolean isValid(CustomerDto objDto, ConstraintValidatorContext context) {

		@SuppressWarnings("unchecked")
		Map<String, String> map = (Map<String, String>) request
				.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
		Integer uriId = Integer.parseInt(map.get("id"));

		List<FieldMessage> list = new ArrayList<>();

		Customer aux = repo.findByEmail(objDto.getGetEmailAddress());
		if (aux != null && !aux.getId().equals(uriId)) {
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
