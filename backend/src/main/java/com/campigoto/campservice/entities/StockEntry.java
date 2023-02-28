package com.campigoto.campservice.entities;

import com.campigoto.campservice.entities.enums.MovementType;
import com.campigoto.campservice.entities.enums.PaymentType;
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
@Table(name = "stockEntry")
public class StockEntry implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer documentNumber;
    @ManyToOne
    private Supplier supplier;
    @Enumerated(EnumType.STRING)
    private PaymentType paymentType;

    private Boolean canceled;
    @Enumerated(EnumType.STRING)
    private MovementType movementType;
    private Double amount;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant entryDate;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant cancelDate;
    private String obs;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof StockEntry stockEntry)) return false;
        return getId().equals(stockEntry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
