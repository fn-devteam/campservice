package com.campigoto.campservice.dto;

import com.campigoto.campservice.entities.Product;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.validation.constraints.NotEmpty;
import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class OrderDetailDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private ServiceOrderDto serviceOrder ;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Product product;
    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Double amount;
    private Double unitaryValue;
    private Double rebate;
    private String obs;
}
