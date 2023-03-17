package com.campigoto.campservice.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
public class VehicleDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Size(min = 8, max = 8, message = "O tamanho deve ter 8 caracteres")
    private String licensePlate;

    @NotEmpty(message = "Preenchimento obrigatório")
    private String brand;

    @NotEmpty(message = "Preenchimento obrigatório")
    private String model;

    @NotEmpty(message = "Preenchimento obrigatório")
    private int year;

    @NotEmpty(message = "Preenchimento obrigatório")
    private int currentKm;

    @NotEmpty(message = "Preenchimento obrigatório")
    private int kmOilChange;

    @NotEmpty(message = "Preenchimento obrigatório")
    private int kmLastOilChange;

    @NotEmpty(message = "Preenchimento obrigatório")
    private int kmChangeTimingBelt;

    @NotEmpty(message = "Preenchimento obrigatório")
    private int kmLastTimingBeltChange;
}
