package com.campigoto.campservice.dto;

import com.campigoto.campservice.entities.Product;
import com.campigoto.campservice.entities.ServiceOrder;
import com.campigoto.campservice.services.validation.CustomerInsert;
import com.campigoto.campservice.services.validation.CustomerUpdate;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.validation.constraints.NotEmpty;
import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@CustomerUpdate
@CustomerInsert
public class OrderDetailDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private ServiceOrder service_order_id ;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Product product_id;
    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Double amount;
    private Double unitary_value;
    private Double rebate;
    private String obs;
}
