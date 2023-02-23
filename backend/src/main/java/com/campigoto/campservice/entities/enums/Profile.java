package com.campigoto.campservice.entities.enums;

public enum Profile {

    CLIENTE("ROLE_CLIENTE"),

    MECANICO("ROLE_MECANICO");

    private final String description;

    Profile(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
