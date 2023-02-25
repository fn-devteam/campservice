package com.campigoto.campservice.entities.enums;

public enum ServiceOrderStatus {
    AGUARDANDO_APROVACAO("Aguardando Aprovação"),
    AGUARDANDO_PECA("Aguardando Peça"),
    APROVADO("Aprovado"),
    RECUSADO("Recusado"),
    FINALIZADO("Finalizado"),
    ENTREGUE("Entregue");

    private final String description;

    ServiceOrderStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
