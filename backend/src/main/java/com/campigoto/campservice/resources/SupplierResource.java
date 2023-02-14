package com.campigoto.campservice.resources;


import com.campigoto.campservice.dto.SupplierDto;
import com.campigoto.campservice.entities.Supplier;
import com.campigoto.campservice.services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping(value = "/suppliers")
public class SupplierResource {

    @Autowired
    private SupplierService service;

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
            @RequestParam(value="page", defaultValue="0") Integer page,
            @RequestParam(value="linesPerPage", defaultValue="24") Integer linesPerPage,
            @RequestParam(value="direction", defaultValue="ASC") String direction,
            @RequestParam(value="orderBy", defaultValue="name") String orderBy
    )
    {
        PageRequest pageRequest = PageRequest.of(page ,linesPerPage, Direction.valueOf(direction),orderBy );

        Page<SupplierDto> list = service.findAllPaged(pageRequest);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public ResponseEntity<SupplierDto> insert(@RequestBody @Valid SupplierDto dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value="/{id}")
    public ResponseEntity<SupplierDto> update(@PathVariable Long id,@Valid @RequestBody SupplierDto dto) {
        dto = service.update(id, dto);

        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}