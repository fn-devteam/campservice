package com.campigoto.campservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		var cors = new CorsConfiguration().applyPermitDefaultValues();
		cors.addAllowedMethod("DELETE");
		cors.addAllowedMethod("PUT");
		cors.addAllowedMethod("PATCH");
		cors.addAllowedMethod("OPTION");

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", cors);
		return source;
	}

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http.cors().and().build();
	}
}
