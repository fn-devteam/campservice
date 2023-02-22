package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.CustomerDto;
import com.campigoto.campservice.entities.Customer;
import com.campigoto.campservice.mappers.CustomerMapper;
import com.campigoto.campservice.repositories.CustumerRepository;
import com.campigoto.campservice.services.exceptions.DataIntegrityException;
import com.campigoto.campservice.services.exceptions.ObjectNotFoundException;
import com.campigoto.campservice.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Transactional
@Service
public class CustomerService {

    private final CustumerRepository repo;
    private final CustomerMapper customerMapper;

    public Customer findById(Long id) {
        Optional<Customer> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Customer.class.getName()));
    }

    @Transactional
    public CustomerDto insert(CustomerDto dto) {
        Customer entity = customerMapper.fromDTO(dto);
        repo.save(entity);
        return customerMapper.toDTO(entity);
    }

    @Transactional
    public @Valid CustomerDto update(Long id, @Valid CustomerDto dto) {

        try {

            Customer entity = customerMapper.fromDTO(dto);
            entity.setId(id);
            entity = repo.save(entity);
            return customerMapper.toDTO(entity);
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

    public List<CustomerDto> findAll() {
        List<Customer> list = repo.findAll(Sort.by("name"));
        return list.stream().map(customerMapper::toDTO).collect(Collectors.toList());
    }

    public CustomerDto findByEmailAddress(String email) {
        Customer obj = repo.findByEmailAddress(email);
        if (obj == null) {
            throw new ObjectNotFoundException(
                    "Objeto não encontrado! Id: " + email + ", Tipo: " + Customer.class.getName());
        }
        return customerMapper.toDTO(obj);
    }


    @Transactional
    public Page<CustomerDto> findAllPaged(PageRequest pageRequest) {
        Page<Customer> customers = repo.findAll(pageRequest);
        return customers.map(customerMapper::toDTO);
    }
}