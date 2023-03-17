package com.campigoto.campservice.services.validation;

import com.campigoto.campservice.dto.CustomerDto;
import com.campigoto.campservice.entities.enums.PersonType;
import com.campigoto.campservice.repositories.CustumerRepository;
import com.campigoto.campservice.resources.exceptions.FieldMessage;
import com.campigoto.campservice.services.validation.utils.BR;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;
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

        if (objDto.getPersonType() == PersonType.FISICA && !BR.isValidCPF(objDto.getCpfCnpj())) {
            list.add(new FieldMessage("cpfCnpj", "CPF inválido"));
        }

        if (objDto.getPersonType() == PersonType.JURIDICA && !BR.isValidCNPJ(objDto.getCpfCnpj())) {
            list.add(new FieldMessage("cpfCnpj", "CNPJ inválido"));
        }

        if (repo.findByEmailAddress(objDto.getEmailAddress()) != null) {
            list.add(new FieldMessage("emailAddress", "Email já existente"));
        }

        list.forEach(e -> {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName())
                    .addConstraintViolation();
        });

        return list.isEmpty();
    }
}