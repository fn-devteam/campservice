package com.campigoto.campservice.entities.enums;

public enum MovementType {
    ENTRADA("Dinheiro"),
    DEVOLUCAO("Cartão de Crédito"),
    SAIDA("Cartão de Débito");

    private final String description;

    MovementType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
