package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.ServiceOrderDto;
import com.campigoto.campservice.entities.ServiceOrder;
import com.campigoto.campservice.mappers.ServiceOrderMapper;
import com.campigoto.campservice.repositories.ServiceOrderRepository;
import com.campigoto.campservice.services.exceptions.DataIntegrityException;
import com.campigoto.campservice.services.exceptions.ObjectNotFoundException;
import com.campigoto.campservice.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ServiceOrderService {

    private final ServiceOrderRepository repo;
    private final ServiceOrderMapper serviceOrderMapper;

    @Transactional(readOnly = true)
    public ServiceOrder findById(Long id) {
        Optional<ServiceOrder> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + ServiceOrder.class.getName()));
    }

    @Transactional
    public ServiceOrderDto insert(ServiceOrderDto dto) {
        ServiceOrder entity = serviceOrderMapper.fromDTO(dto);
        entity = repo.save(entity);
        return serviceOrderMapper.toDTO(entity);
    }

    @Transactional
    public @Valid ServiceOrderDto update(Long id, ServiceOrderDto dto) {

        try {
            ServiceOrder entity = serviceOrderMapper.fromDTO(dto);
            entity.setId(id);
            entity = repo.save(entity);
            return serviceOrderMapper.toDTO(entity);
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
    public List<ServiceOrderDto> findAll() {
        List<ServiceOrder> list = repo.findAll(Sort.by("vehicle"));
        return list.stream().map(serviceOrderMapper::toDTO).collect(Collectors.toList());
    }



    @Transactional(readOnly = true)
    public Page<ServiceOrderDto> findAllPaged(PageRequest pageRequest) {
        Page<ServiceOrder> serviceOrder = repo.findAll(pageRequest);
        return serviceOrder.map(serviceOrderMapper::toDTO);
    }
}