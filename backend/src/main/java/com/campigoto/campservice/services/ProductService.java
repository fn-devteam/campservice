package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.ProductDto;
import com.campigoto.campservice.entities.Product;
import com.campigoto.campservice.mappers.ProductMapper;
import com.campigoto.campservice.repositories.ProductRepository;
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
public class ProductService {
    @Autowired
    private ProductRepository repo;

    @Autowired
    private ProductMapper productMapper;

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

    public void delete(Long id) {
        findById(id);
        try {
            repo.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir porque há pedidos relacionados");
        }
    }


    @Transactional
    public Page<ProductDto> findAllPaged(PageRequest pageRequest) {
        Page<Product> products = repo.findAll(pageRequest);
        return products.map(product -> productMapper.toDTO(product));
    }


}