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
}