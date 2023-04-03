package com.campigoto.campservice.resources;


import com.campigoto.campservice.dto.GroupFilterDto;
import com.campigoto.campservice.dto.ProductGroupDto;
import com.campigoto.campservice.services.ProductGroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/product_groups")
public class ProductGroupResource {

    private final ProductGroupService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProductGroupDto> findById(@PathVariable Long id) {
        ProductGroupDto dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping
    public ResponseEntity<Page<ProductGroupDto>> findAll(
            GroupFilterDto filter,
            Pageable pageable
    ) {
        Page<ProductGroupDto> list = service.findAllPaged(filter, pageable);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public ResponseEntity<ProductGroupDto> insert(@RequestBody @Valid ProductGroupDto dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ProductGroupDto> update(@PathVariable Long id, @Valid @RequestBody ProductGroupDto dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}