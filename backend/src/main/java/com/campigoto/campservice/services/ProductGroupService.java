package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.GroupFilterDto;
import com.campigoto.campservice.dto.ProductGroupDto;
import com.campigoto.campservice.entities.ProductGroup;
import com.campigoto.campservice.mappers.ProductGroupMapper;
import com.campigoto.campservice.repositories.ProductGroupRepository;
import com.campigoto.campservice.services.exceptions.DataIntegrityException;
import com.campigoto.campservice.services.exceptions.ObjectNotFoundException;
import com.campigoto.campservice.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ProductGroupService {

    private final ProductGroupRepository repo;
    private final ProductGroupMapper productGroupMapper;

    @Transactional(readOnly = true)
    public ProductGroupDto findById(Long id) {
        ProductGroup obj = repo.findById(id).orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + ProductGroupMapper.class.getName()));

        return productGroupMapper.toDTO(obj);
    }

    @Transactional
    public ProductGroupDto insert(ProductGroupDto dto) {
        ProductGroup entity = productGroupMapper.fromDTO(dto);
        entity = repo.save(entity);
        return productGroupMapper.toDTO(entity);
    }

    @Transactional
    public @Valid ProductGroupDto update(Long id, ProductGroupDto dto) {
        try {

            ProductGroup entity = productGroupMapper.fromDTO(dto);
            entity.setId(id);
            entity = repo.save(entity);
            return productGroupMapper.toDTO(entity);
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
    public Page<ProductGroupDto> findAllPaged(GroupFilterDto filter, Pageable pageable) {
        Page<ProductGroup> productGroups = repo.findByTerm(filter, pageable);
        return productGroups.map(productGroupMapper::toDTO);
    }

}