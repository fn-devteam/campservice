package com.campigoto.campservice.entities;

import com.campigoto.campservice.entities.enums.ServiceOrderStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "serviceOrder")
public class ServiceOrder implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Customer customer;
    @ManyToOne
    private Vehicle vehicle;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant entryDate;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant deliveryDate;
    @Enumerated(EnumType.STRING)
    private ServiceOrderStatus status;
    private Double amount;
    private Double rebate;
    private Integer currentKm;
    private String obs;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ServiceOrder serviceOrder)) return false;
        return getId().equals(serviceOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
