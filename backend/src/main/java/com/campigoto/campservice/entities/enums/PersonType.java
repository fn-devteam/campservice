package com.campigoto.campservice.entities.enums;

public enum PersonType {

	FISICA(1, "Pessoa Física"),
	JURIDICA(2, "Pessoa Jurídica");

	private int cod;
	private String description;

	PersonType(int cod, String description) {
		this.cod = cod;
		this.description = description;

	}

	public int getCod() {
		return cod;
	}

	public String getDescription() {
		return description;
	}
	
	public static PersonType toEnum(Integer cod) {
		if (cod == null) {
			return null;
		}
		
		for (PersonType x : PersonType.values()) {
			if (cod.equals(x.getCod())) {
				return x;
			}
		}
		
		throw new IllegalArgumentException("Id inválido: " + cod);
		
	}

}
