package com.campigoto.campservice.entities;

import jakarta.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

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

    private String getOriginal_code1;

    private double quantity_last_entry;

    private String product_location;

    private int last_supplier;

    private String item_type;

    private String references;


    public  Product() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getGroup() {
        return group;
    }

    public void setGroup(int group) {
        this.group = group;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getObs() {
        return obs;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public double getPurchase_price() {
        return purchase_price;
    }

    public void setPurchase_price(double purchase_price) {
        this.purchase_price = purchase_price;
    }

    public double getCurrent_inventory() {
        return current_inventory;
    }

    public void setCurrent_inventory(double current_inventory) {
        this.current_inventory = current_inventory;
    }

    public double getMinimum_stock() {
        return minimum_stock;
    }

    public void setMinimum_stock(double minimum_stock) {
        this.minimum_stock = minimum_stock;
    }

    public double getSale_price() {
        return sale_price;
    }

    public void setSale_price(double sale_price) {
        this.sale_price = sale_price;
    }

    public double getPrice_value() {
        return price_value;
    }

    public void setPrice_value(double price_value) {
        this.price_value = price_value;
    }

    public double getProfit_margin() {
        return profit_margin;
    }

    public void setProfit_margin(double profit_margin) {
        this.profit_margin = profit_margin;
    }

    public double getFactory_index() {
        return factory_index;
    }

    public void setFactory_index(double factory_index) {
        this.factory_index = factory_index;
    }

    public double getList_price() {
        return list_price;
    }

    public void setList_price(double list_price) {
        this.list_price = list_price;
    }

    public double getRebate() {
        return rebate;
    }

    public void setRebate(double rebate) {
        this.rebate = rebate;
    }

    public String getOriginal_code() {
        return original_code;
    }

    public void setOriginal_code(String original_code) {
        this.original_code = original_code;
    }

    public String getGetOriginal_code1() {
        return getOriginal_code1;
    }

    public void setGetOriginal_code1(String getOriginal_code1) {
        this.getOriginal_code1 = getOriginal_code1;
    }

    public double getQuantity_last_entry() {
        return quantity_last_entry;
    }

    public void setQuantity_last_entry(double quantity_last_entry) {
        this.quantity_last_entry = quantity_last_entry;
    }

    public String getProduct_location() {
        return product_location;
    }

    public void setProduct_location(String product_location) {
        this.product_location = product_location;
    }

    public int getLast_supplier() {
        return last_supplier;
    }

    public void setLast_supplier(int last_supplier) {
        this.last_supplier = last_supplier;
    }

    public String getItem_type() {
        return item_type;
    }

    public void setItem_type(String item_type) {
        this.item_type = item_type;
    }

    public String getReferences() {
        return references;
    }

    public void setReferences(String references) {
        this.references = references;
    }

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
