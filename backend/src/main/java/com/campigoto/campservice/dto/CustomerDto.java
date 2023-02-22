package com.campigoto.campservice.dto;

import com.campigoto.campservice.entities.enums.PersonType;
import com.campigoto.campservice.entities.enums.Profile;
import com.campigoto.campservice.services.validation.CustomerInsert;
import com.campigoto.campservice.services.validation.CustomerUpdate;
import jakarta.persistence.Column;
import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@CustomerUpdate
@CustomerInsert
public class CustomerDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Size(min = 5, max = 120, message = "O tamanho deve ser entre 5 e 100 caracteres")
    private String name;

    @Size(min = 5, max = 120, message = "O tamanho deve ser entre 5 e 100 caracteres")
    private String fantasyName;

    private boolean active;

    @NotEmpty(message = "Preenchimento obrigatório")
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
    private Profile profile;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant registrationDate;
}
