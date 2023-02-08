package com.campigoto.campservice.entities.enums;

public enum Profile {

	CLIENTE(1, "ROLE_CLIENTE"),

	MECANICO(2, "ROLE_MECANICO");

	private int cod;
	private String description;

	Profile(int cod, String description) {
		this.cod = cod;
		this.description = description;

	}

	public int getCod() {
		return cod;
	}

	public String getDescription() {
		return description;
	}
	
	public static Profile toEnum(Integer cod) {
		if (cod == null) {
			return null;
		}
		
		for (Profile x : Profile.values()) {
			if (cod.equals(x.getCod())) {
				return x;
			}
		}
		
		throw new IllegalArgumentException("Id inválido: " + cod);
		
	}

}
