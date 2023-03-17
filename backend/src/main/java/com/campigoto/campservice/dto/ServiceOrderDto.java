package com.campigoto.campservice.dto;

import com.campigoto.campservice.entities.enums.ServiceOrderStatus;
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
public class ServiceOrderDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private CustomerDto customer;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private VehicleDto vehicle;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Instant entryDate;

    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Instant deliveryDate;
    private Double amount;
    private Double rebate;
    private Integer currentKm;
    private String obs;
    private ServiceOrderStatus status;
}
