package com.campigoto.campservice.resources;


import com.campigoto.campservice.dto.ProductDto;
import com.campigoto.campservice.dto.ProductFilterDto;
import com.campigoto.campservice.entities.enums.ItemType;
import com.campigoto.campservice.services.ProductService;
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
@RequestMapping(value = "/products")
public class ProductResource {

    private final ProductService service;


    @GetMapping(value = "/{id}")
    public ResponseEntity<ProductDto> findById(@PathVariable Long id) {
        ProductDto dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping
    public ResponseEntity<Page<ProductDto>> findAll(
            ProductFilterDto filter,
            Pageable pageable
    ) {
        Page<ProductDto> list = service.findAllPaged(filter, pageable);
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/itemType")
    public ItemType[] getEnums() {
        return ItemType.values();
    }

    @PostMapping
    public ResponseEntity<ProductDto> insert(@RequestBody @Valid ProductDto dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ProductDto> update(@PathVariable Long id, @Valid @RequestBody ProductDto dto) {
        dto = service.update(id, dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}