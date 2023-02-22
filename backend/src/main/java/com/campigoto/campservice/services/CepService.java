package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.BuscaCEPDto;
import com.campigoto.campservice.resources.exceptions.CepNotFoundException;
import com.campigoto.campservice.services.exceptions.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CepService {

    private final String CEP_API = "https://viacep.com.br/ws/";

    public BuscaCEPDto buscar(String cep) {

        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = CEP_API + cep + "/json";

            ResponseEntity<BuscaCEPDto> response = restTemplate.getForEntity(url, BuscaCEPDto.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                if (response.getBody() != null && !response.getBody().isErro()) {
                    return response.getBody();
                } else {
                    throw new CepNotFoundException();
                }
            } else {

                throw new ResourceNotFoundException("Falha ao buscar cep:" + cep);
            }

        } catch (Exception e) {
            throw new ResourceNotFoundException("Falha ao buscar cep: " + cep);
        }
    }

}
