package com.campigoto.campservice.entities;

import com.campigoto.campservice.entities.enums.PersonType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "supplier")
public class Supplier implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String fantasyName;
    private boolean active;
    @Enumerated(EnumType.STRING)
    private PersonType personType;
    private String cpfCnpj;
    private String stateRegistration;
    private String zipCode;
    private String address;
    private String district;
    private String city;
    private String state;
    private String phoneNumber;
    private String cellNumber;
    private String emailAddress;
    private String contactPerson;
    private String obs;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant registrationDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Supplier customer)) return false;
        return getId().equals(customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
