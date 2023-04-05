package com.campigoto.campservice.resources;


import com.campigoto.campservice.dto.SupplierDto;
import com.campigoto.campservice.dto.SupplierFilterDto;
import com.campigoto.campservice.entities.enums.PersonType;
import com.campigoto.campservice.services.SupplierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/suppliers")
public class SupplierResource {

    private final SupplierService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<SupplierDto> findById(@PathVariable Long id) {
        SupplierDto dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping(value = "/email/{email}")
    public ResponseEntity<SupplierDto> findByEmailAddress(@PathVariable String email) {
        SupplierDto dto = service.findByEmailAddress(email);
        return ResponseEntity.ok().body(dto);
    }
    @GetMapping
    public ResponseEntity<Page<SupplierDto>> findAll(
            SupplierFilterDto filter,
            Pageable pageable
    ) {
        Page<SupplierDto> list = service.findAllPaged(filter, pageable);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/personType")
    public PersonType[] getEnums() {
        return PersonType.values();
    }

    @PostMapping
    public ResponseEntity<SupplierDto> insert(@RequestBody @Valid SupplierDto dto) throws Exception {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<SupplierDto> update(@PathVariable Long id, @Valid @RequestBody SupplierDto dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/cep/{cep}")
    public ResponseEntity<List<SupplierDto>> findByCep(@PathVariable("cep") String cep) {
        return ResponseEntity.ok(service.findByCep(cep));
    }

}