package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.ProductGroupDto;
import com.campigoto.campservice.dto.SupplierDto;
import com.campigoto.campservice.entities.ProductGroup;
import com.campigoto.campservice.mappers.ProductGroupMapper;
import com.campigoto.campservice.repositories.ProductGroupRepository;
import com.campigoto.campservice.services.exceptions.DataIntegrityException;
import com.campigoto.campservice.services.exceptions.ObjectNotFoundException;
import com.campigoto.campservice.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Transactional
@Service
public class ProductGroupService {

    @Autowired
    private ProductGroupRepository repo;

    @Autowired
    private ProductGroupMapper productGroupMapper;

    public ProductGroupDto findById(Long id) {
        ProductGroup obj = repo.findById(id).orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + ProductGroupMapper.class.getName()));
        return productGroupMapper.toDTO(obj);
    }

    @Transactional
    public ProductGroupDto insert(ProductGroupDto dto) {

        ProductGroup entity = productGroupMapper.fromDTO(dto);
        repo.save(entity);
        return productGroupMapper.toDTO(entity);
    }

    @Transactional
    public @Valid ProductGroupDto update(Long id, @Valid ProductGroupDto dto) {
        try {

            ProductGroup entity = productGroupMapper.fromDTO(dto);
            entity.setId(id);
            entity = repo.save(entity);
            return productGroupMapper.toDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);

        }
    }

    public void delete(Long id) {
        findById(id);
        try {
            repo.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir porque há pedidos relacionados");
        }
    }

    @Transactional
    public Page<ProductGroupDto> findAllPaged(PageRequest pageRequest) {
        Page<ProductGroup> productGroups = repo.findAll(pageRequest);
        return productGroups.map(productGroup -> productGroupMapper.toDTO(productGroup));
    }

    private void updateData(ProductGroup newObj, SupplierDto obj) {
        newObj.setName(obj.getName());
        newObj.setObs(obj.getObs());
    }
}