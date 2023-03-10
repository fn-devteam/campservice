package com.campigoto.campservice.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "vehicle")
public class Vehicle implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String licensePlate;
    private String brand;
    private String model;
    private int year;
    private int currentKm;
    private int kmOilChange;
    private int kmLastOilChange;
    private int kmChangeTimingBelt;
    private int kmLastTimingBeltChange;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Vehicle vehicle)) return false;
        return getId().equals(vehicle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
