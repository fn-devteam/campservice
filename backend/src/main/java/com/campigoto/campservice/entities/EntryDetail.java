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
@Table(name = "entryDetail")
public class EntryDetail implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private StockEntry entryId;
    @ManyToOne
    private Product productId;
    private Double amount;
    private String obs;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EntryDetail entryDetail)) return false;
        return getId().equals(entryDetail.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
