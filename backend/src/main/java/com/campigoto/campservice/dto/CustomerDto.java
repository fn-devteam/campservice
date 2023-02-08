package com.campigoto.campservice.dto;


import com.campigoto.campservice.entities.enums.PersonType;
import com.campigoto.campservice.entities.enums.Profile;
import com.campigoto.campservice.services.validation.CustomerUpdate;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.FetchType;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@CustomerUpdate
public class CustomerDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private Integer id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Size(min = 5, max = 120, message = "O tamanho deve ser entre 5 e 100 caracteres")
    private String name;

    @Size(min = 5, max = 120, message = "O tamanho deve ser entre 5 e 100 caracteres")
    private String fantasyName;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Email(message = "Email inválido")
    private String getEmailAddress;
    private String cpfCnpj;


    @ElementCollection(fetch= FetchType.EAGER)
    @CollectionTable(name="PERSONTYPES")
    private Set<PersonType> personTypes = new HashSet<>();

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

    public CustomerDto() {
    }

    public CustomerDto(Integer id, String name, String fantasyName,
                       String getEmailAddress, String cpfCnpj,
                       Set<PersonType> personTypes, String stateRegistration,
                       String zipCode, String address, String district,
                       String city, String state, String phoneNumber,
                       String cellNumber, String contactPerson,
                       String obs, Profile profile,
                       Instant registrationDate) {
        this.id = id;
        this.name = name;
        this.fantasyName = fantasyName;
        this.getEmailAddress = getEmailAddress;
        this.cpfCnpj = cpfCnpj;
        this.personTypes = personTypes;
        this.stateRegistration = stateRegistration;
        this.zipCode = zipCode;
        this.address = address;
        this.district = district;
        this.city = city;
        this.state = state;
        this.phoneNumber = phoneNumber;
        this.cellNumber = cellNumber;
        this.contactPerson = contactPerson;
        this.obs = obs;
        this.profile = profile;
        this.registrationDate = registrationDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFantasyName() {
        return fantasyName;
    }

    public void setFantasyName(String fantasyName) {
        this.fantasyName = fantasyName;
    }

    public String getGetEmailAddress() {
        return getEmailAddress;
    }

    public void setGetEmailAddress(String getEmailAddress) {
        this.getEmailAddress = getEmailAddress;
    }

    public String getCpfCnpj() {
        return cpfCnpj;
    }

    public void setCpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
    }

    public Set<PersonType> getPersonTypes() {

        return personTypes;
    }

    public void setPersonTypes(Set<PersonType> personTypes) {

        this.personTypes = personTypes;
    }

    public String getStateRegistration() {
        return stateRegistration;
    }

    public void setStateRegistration(String stateRegistration) {
        this.stateRegistration = stateRegistration;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCellNumber() {
        return cellNumber;
    }

    public void setCellNumber(String cellNumber) {

        this.cellNumber = cellNumber;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getObs() {
        return obs;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {

        this.profile = profile;
    }

    public Instant getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;

    }
}
