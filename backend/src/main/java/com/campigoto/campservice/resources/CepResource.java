package com.campigoto.campservice.resources;

import com.campigoto.campservice.dto.CEPDto;
import com.campigoto.campservice.dto.SupplierDto;
import com.campigoto.campservice.services.ViaCepService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/cep")
public class CepResource {

    private final ViaCepService viaCepService;

    @GetMapping("/{cep}")
    public CEPDto findAddressByCep(@PathVariable("cep") String cep) throws Exception {
        return viaCepService.findAddressByCep(cep);
    }
    private void getAddressIfNotInformed(SupplierDto dto) throws Exception {
        if ((dto.getZipCode() != null && dto.getZipCode().isBlank()) && (dto.getAddress() == null || dto.getAddress().isEmpty())) {
            CEPDto address = viaCepService.findAddressByCep(dto.getZipCode());
            dto.setAddress(address.getLogradouro());
            dto.setCity(address.getLocalidade());
            dto.setState(address.getUf());
            dto.setDistrict(address.getBairro());
        }
    }
}