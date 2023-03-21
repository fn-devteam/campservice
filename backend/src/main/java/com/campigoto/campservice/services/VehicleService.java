package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.VehicleDto;
import com.campigoto.campservice.entities.Vehicle;
import com.campigoto.campservice.mappers.VehicleMapper;
import com.campigoto.campservice.repositories.VehicleRepository;
import com.campigoto.campservice.services.exceptions.DataIntegrityException;
import com.campigoto.campservice.services.exceptions.ObjectNotFoundException;
import com.campigoto.campservice.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class VehicleService {

    private final VehicleRepository repo;
    private final VehicleMapper vehicleMapper;

    @Transactional(readOnly = true)
    public Vehicle findById(Long id) {
        Optional<Vehicle> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Vehicle.class.getName()));
    }

    @Transactional
    public VehicleDto insert(VehicleDto dto) {
        Vehicle entity = vehicleMapper.fromDTO(dto);
        entity = repo.save(entity);
        return vehicleMapper.toDTO(entity);
    }

    @Transactional
    public @Valid VehicleDto update(Long id, VehicleDto dto) {

        try {
            Vehicle entity = vehicleMapper.fromDTO(dto);
            entity.setId(id);
            entity = repo.save(entity);
            return vehicleMapper.toDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        }
    }

    @Transactional
    public void delete(Long id) {
        findById(id);
        try {
            repo.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir porque há pedidos relacionados");
        }
    }

    @Transactional(readOnly = true)
    public List<VehicleDto> findAll() {
        List<Vehicle> list = repo.findAll(Sort.by("licensePlate"));
        return list.stream().map(vehicleMapper::toDTO).collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public Page<VehicleDto> findAllPaged(PageRequest pageRequest) {
        Page<Vehicle> vehicles = repo.findAll(pageRequest);
        return vehicles.map(vehicleMapper::toDTO);
    }
}