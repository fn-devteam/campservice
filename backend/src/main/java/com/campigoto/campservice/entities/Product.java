package com.campigoto.campservice.entities;

import jakarta.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "product")
public class Product implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int group;

    private boolean active;

    private String description;

    private String unit;

    private String obs;

    private double purchase_price;

    private double current_inventory;

    private double minimum_stock;

    private double sale_price;

    private double price_value;

    private double profit_margin;

    private double factory_index;

    private double list_price;

    private double rebate;

    private String original_code;

    private String original_code1;

    private double quantity_last_entry;

    private String product_location;

    private int last_supplier;

    private String item_type;

    private String references;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "product_supplier",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "supplier_id")
    )
    private Set<Supplier> suppliers = new HashSet<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product customer)) return false;
        return getId().equals(customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
