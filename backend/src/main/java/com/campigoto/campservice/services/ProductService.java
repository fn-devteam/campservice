package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.ProductDto;
import com.campigoto.campservice.dto.ProductFilterDto;
import com.campigoto.campservice.entities.Product;
import com.campigoto.campservice.mappers.ProductMapper;
import com.campigoto.campservice.repositories.ProductRepository;
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
public class ProductService {

    private final ProductRepository repo;
    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    public ProductDto findById(Long id) {
        Product obj = repo.findById(id).orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Product.class.getName()));
        return productMapper.toDTO(obj);
    }

    @Transactional
    public ProductDto insert(ProductDto dto) {

        Product entity = productMapper.fromDTO(dto);
        repo.save(entity);
        return productMapper.toDTO(entity);
    }

    @Transactional
    public @Valid ProductDto update(Long id, @Valid ProductDto dto) {

        try {

            Product entity = productMapper.fromDTO(dto);
            entity.setId(id);
            entity = repo.save(entity);
            return productMapper.toDTO(entity);
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
    public Page<ProductDto> findAllPaged(ProductFilterDto filter, Pageable pageable) {
        Page<Product> list = repo.findByTerm(filter, pageable);
        return list.map(productMapper::toDTO);
    }

}