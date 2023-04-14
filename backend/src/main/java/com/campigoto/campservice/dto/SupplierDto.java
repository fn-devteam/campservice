package com.campigoto.campservice.dto;

import com.campigoto.campservice.entities.enums.PersonType;
import com.campigoto.campservice.services.validation.SupplierInsert;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Data
@NoArgsConstructor
@SupplierInsert
public class SupplierDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Size(min = 5, max = 120, message = "O tamanho deve ser entre 5 e 100 caracteres")
    private String name;

    private boolean active;

    @Email(message = "Email inválido")
    private String emailAddress;

    private String cpfCnpj;

    private PersonType personType;

    private String stateRegistration;
    private String zipCode;
    private String address;
    private String district;
    private String city;
    private String state;
    private String phoneNumber;
    private String cellNumber;
    private String contactPerson;
    private String obs;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant registrationDate;

    private Boolean toEdit;
}
