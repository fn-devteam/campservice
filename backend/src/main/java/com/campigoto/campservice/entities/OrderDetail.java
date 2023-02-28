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
@Table(name = "order_detail")
public class OrderDetail implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private ServiceOrder serviceOrder ;
    @ManyToOne
    private Product product;
    private Double amount;
    private Double unitaryValue;
    private Double rebate;
    private String obs;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof OrderDetail orderDetail)) return false;
        return getId().equals(orderDetail.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
