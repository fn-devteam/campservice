package com.campigoto.campservice.entities.enums;

public enum PaymentType {
    DINHEIRO("Dinheiro"),
    PIX("Pix"),
    CARTAO_CREDITO("Cartão de Crédito"),
    CARTAO_DEBITO("Cartão de Débito"),
    BOLETO("Boleto Bancário");

    private final String description;

    PaymentType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
