package com.campigoto.campservice.entities;

import com.campigoto.campservice.entities.enums.ItemType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

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

    @ManyToOne
    private ProductGroup group;

    private boolean active;

    private String description;

    private String unit;

    private String obs;

    private double purchasePrice;

    private double currentInventory;

    private double minimumStock;

    private double salePrice;

    private double priceValue;

    private double profitMargin;

    private double factoryIndex;

    private double listPrice;

    private double rebate;

    private String originalCode;

    private String originalCode1;

    private double quantityLastEntry;

    private String productLocation;

    @ManyToOne
    private Supplier lastSupplier;
    @Enumerated(EnumType.STRING)
    private ItemType itemType;

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
