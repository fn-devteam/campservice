package com.campigoto.campservice.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Data
@NoArgsConstructor
public class StockEntryDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Integer documentNumber;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private SupplierDto supplier;

    private String paymentType;

    private Boolean canceled;
    private String movementType;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Double amount;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Instant entryDate;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Instant cancelDate;
    private String obs;
}
