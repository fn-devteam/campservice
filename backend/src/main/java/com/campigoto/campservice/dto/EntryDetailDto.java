package com.campigoto.campservice.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class EntryDetailDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private StockEntryDto entry;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private ProductDto product;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Double amount;
    private String obs;
}
