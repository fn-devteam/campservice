package com.campigoto.campservice.dto;

import com.campigoto.campservice.entities.Customer;
import com.campigoto.campservice.entities.Vehicle;
import com.campigoto.campservice.entities.enums.ServiceOrderStatus;
import com.campigoto.campservice.services.validation.CustomerInsert;
import com.campigoto.campservice.services.validation.CustomerUpdate;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.validation.constraints.NotEmpty;
import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

@Data
@NoArgsConstructor
@CustomerUpdate
@CustomerInsert
public class ServiceOrderDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Customer customer;

    @NotEmpty(message = "Preenchimento obrigatório")
    @NonNull
    private Vehicle vehicle;

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
    private int currentKm;
    private String obs;
    private ServiceOrderStatus status;
}
