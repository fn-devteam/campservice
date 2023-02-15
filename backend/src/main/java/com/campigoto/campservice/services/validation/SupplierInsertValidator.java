package com.campigoto.campservice.services.validation;

import com.campigoto.campservice.dto.SupplierDto;
import com.campigoto.campservice.entities.enums.PersonType;
import com.campigoto.campservice.repositories.SupplierRepository;
import com.campigoto.campservice.resources.exceptions.FieldMessage;
import com.campigoto.campservice.services.validation.utils.BR;
import java.util.ArrayList;
import java.util.List;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class SupplierInsertValidator implements ConstraintValidator<SupplierInsert, SupplierDto> {

    @Autowired
    private SupplierRepository repo;

    @Override
    public void initialize(SupplierInsert ann) {
    }

    @Override
    public boolean isValid(SupplierDto objDto, ConstraintValidatorContext context) {

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