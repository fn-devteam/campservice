package com.campigoto.campservice.dto;

import com.campigoto.campservice.services.validation.SupplierInsert;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serial;
import java.io.Serializable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@SupplierInsert
public class ProductDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotEmpty(message = "Preenchimento obrigatório")
    @Size(min = 5, max = 120, message = "O tamanho deve ser entre 5 e 100 caracteres")
    private String description;

    private int group;

    private boolean active;

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

    private SupplierDto lastSupplier;

    private String itemType;

    private String references;
}