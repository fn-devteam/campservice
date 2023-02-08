package com.campigoto.campservice.entities;

import com.campigoto.campservice.entities.enums.PersonType;
import com.campigoto.campservice.entities.enums.Profile;
import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Entity

@Table(name = "customer")
public class Customer implements Serializable {

    public Customer() { }

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String fantasyName;
    private int active;
    private int personType;
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
    private int profile;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant registrationDate;

    public Customer(Long id, String name, String fantasyName, int active,
                    int personType, String cpfCnpj, String stateRegistration,
                    String zipCode, String address, String district, String city,
                    String state, String phoneNumber, String cellNumber, String emailAddress,
                    String contactPerson, String obs, int profile, Instant registrationDate) {
        this.id = id;
        this.name = name;
        this.fantasyName = fantasyName;
        this.active = active;
        this.personType = personType;
        this.cpfCnpj = cpfCnpj;
        this.stateRegistration = stateRegistration;
        this.zipCode = zipCode;
        this.address = address;
        this.district = district;
        this.city = city;
        this.state = state;
        this.phoneNumber = phoneNumber;
        this.cellNumber = cellNumber;
        this.emailAddress = emailAddress;
        this.contactPerson = contactPerson;
        this.obs = obs;
        this.profile = profile;
        this.registrationDate = registrationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public String getCpfCnpj() {
        return cpfCnpj;
    }

    public void setCpfCnpj(String cpfCnpj) {
        this.cpfCnpj = cpfCnpj;
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

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
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
        return Profile.toEnum(this.profile); }

    public void setProfile(Profile customer) {

        this.profile = customer.getCod();
    }

    public void setPersonType(PersonType personType) {

        this.personType = personType.getCod();
    }

    public PersonType getPersonType() {

        return PersonType.toEnum(this.personType);
    }

    public Instant getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Customer customer)) return false;
        return getId().equals(customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
