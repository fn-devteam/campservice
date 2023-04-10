package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.CEPDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ViaCepService {

    @Value("${via.cep.url}")
    private String viaCepUrl;

    private final HttpService httpService;
    private final CepCacheService cepCacheService;

    public CEPDto findAddressByCep(String cep) throws Exception {

        CEPDto address = cepCacheService.getCep(cep);
        if (address != null) {
            return address;
        }

        ResponseEntity<CEPDto> response = httpService.get(viaCepUrl, CEPDto.class, cep);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new Exception("Falha na api de CEP");
        }

        address = response.getBody();
        assert address != null;
        if (address.isErro())
            throw new Exception("Cep inexistente");

        cepCacheService.saveCep(address);

        return address;
    }
}