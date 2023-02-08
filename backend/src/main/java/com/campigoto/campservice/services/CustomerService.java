package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.CustomerDto;
import com.campigoto.campservice.entities.Customer;
import com.campigoto.campservice.mappers.CustomerMapper;
import com.campigoto.campservice.repositories.CustumerRepository;
import com.campigoto.campservice.services.exceptions.DataIntegrityException;
import com.campigoto.campservice.services.exceptions.ObjectNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public Customer insert(Customer obj) {
        obj.setId(null);
        obj = repo.save(obj);
        return obj;
    }

    public Customer update(Customer obj) {
        Customer newObj = repo.findById(obj.getId()).orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + obj.getId() + ", Tipo: " + Customer.class.getName()));

        updateData(newObj, obj);
        return repo.save(newObj);
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
        return this.customerMapper.toDTO(repo.findAll());
    }

    public CustomerDto findByEmail(String email) {
        Customer obj = repo.findByEmail(email);
        if (obj == null) {
            throw new ObjectNotFoundException(
                    "Objeto não encontrado! Id: " + obj.getId() + ", Tipo: " + Customer.class.getName());
        }
        return customerMapper.toDTO(obj);

        //return obj;
    }

    public Page<Customer> findPage(Integer page, Integer linesPerPage, String orderBy, String direction) {
        PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
        return repo.findAll(pageRequest);
    }

    public Customer fromDTO(CustomerDto objDto) {
        return customerMapper.fromDTO(objDto);

    }

    private void updateData(Customer newObj, Customer obj) {
        newObj.setName(obj.getName());
        newObj.setEmailAddress(obj.getEmailAddress());
    }


}