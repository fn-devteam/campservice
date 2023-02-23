package com.campigoto.campservice.resources;

import com.campigoto.campservice.dto.CustomerDto;
import com.campigoto.campservice.dto.VehicleDto;
import com.campigoto.campservice.entities.Vehicle;
import com.campigoto.campservice.services.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/vehicles")
public class VehicleResource {

    private final VehicleService service;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Vehicle> findById(@PathVariable Long id) {
        Vehicle dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }
    @GetMapping
    public ResponseEntity<Page<VehicleDto>> findAll(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "linesPerPage", defaultValue = "24") Integer linesPerPage,
            @RequestParam(value = "direction", defaultValue = "ASC") String direction,
            @RequestParam(value = "orderBy", defaultValue = "licensePlate") String orderBy
    ) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);

        Page<VehicleDto> list = service.findAllPaged(pageRequest);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping
    public ResponseEntity<VehicleDto> insert(@RequestBody @Valid VehicleDto dto) {
        dto = service.insert(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<VehicleDto> update(@PathVariable Long id, @Valid @RequestBody VehicleDto dto) {
        dto = service.update(id, dto);

        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}