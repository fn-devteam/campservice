package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.CustomerDto;
import com.campigoto.campservice.entities.Customer;
import com.campigoto.campservice.mappers.CustomerMapper;
import com.campigoto.campservice.repositories.CustumerRepository;
import com.campigoto.campservice.services.exceptions.DataIntegrityException;
import com.campigoto.campservice.services.exceptions.ObjectNotFoundException;
import com.campigoto.campservice.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
public class CustomerService {

    @Autowired
    private BCryptPasswordEncoder pe;

    @Autowired
    private CustumerRepository repo;

    @Autowired
    private CustomerMapper customerMapper;

    public CustomerDto find(Long id) {


        Customer customer = repo.findById(id).orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Customer.class.getName()));

        return customerMapper.toDTO(customer);
    }

    public Customer findById(Long id) {
        Optional<Customer> obj = repo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Customer.class.getName()));
    }

    @Transactional
    public CustomerDto insert(CustomerDto dto) {

        Customer entity =  customerMapper.fromDTO(dto);
        repo.save(entity);
        return customerMapper.toDTO(entity);


    }

    @Transactional
    public @Valid CustomerDto update(Long id, @Valid CustomerDto dto) {
        try {
            Customer entity = repo.getReferenceById(id);
            customerMapper.fromDTO(dto);
            entity = repo.save(entity);
            return new CustomerDto();
        }
        catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);

        }
    }

    public void delete(Long id) {
        find(id);
        try {
            repo.deleteById(id);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Não é possível excluir porque há pedidos relacionados");
        }
    }

    public List<CustomerDto> findAll() {
        List<Customer> list = repo.findAll(Sort.by("name"));
        return list.stream().map(x -> customerMapper.toDTO(x)).collect(Collectors.toList());
    }

    public CustomerDto findByEmailAddress(String email) {
        Customer obj = repo.findByEmailAddress(email);
        if (obj == null) {
            throw new ObjectNotFoundException(
                    "Objeto não encontrado! Id: " + obj.getEmailAddress() + ", Tipo: " + Customer.class.getName());
        }
        return customerMapper.toDTO(obj);

        //return obj;
    }


    @Transactional
    public Page<CustomerDto> findAllPaged(PageRequest pageRequest) {
        Page<Customer> customers = repo.findAll(pageRequest);
        return customers.map(customer -> customerMapper.toDTO(customer));
    }


    private void updateData(Customer newObj, CustomerDto obj) {
        newObj.setName(obj.getName());
        newObj.setEmailAddress(obj.getEmailAddress());
    }





}