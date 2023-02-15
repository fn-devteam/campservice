package com.campigoto.campservice.entities.enums;

public enum PersonType {
    FISICA("Pessoa Física"),
    JURIDICA("Pessoa Jurídica");

    private String description;

    PersonType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
