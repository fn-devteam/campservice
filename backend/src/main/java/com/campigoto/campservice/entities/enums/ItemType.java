package com.campigoto.campservice.entities.enums;

public enum ItemType {
    PRODUTO("Produto"),
    SERVICO("Serviço");

    private final String description;

    ItemType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
