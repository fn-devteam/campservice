package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.SupplierDto;
import com.campigoto.campservice.entities.Customer;
import com.campigoto.campservice.entities.Supplier;
import com.campigoto.campservice.mappers.SupplierMapper;
import com.campigoto.campservice.repositories.SupplierRepository;
import com.campigoto.campservice.services.exceptions.DataIntegrityException;
import com.campigoto.campservice.services.exceptions.ObjectNotFoundException;
import com.campigoto.campservice.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Transactional
@Service
public class SupplierService {

    @Autowired
    private BCryptPasswordEncoder pe;

    @Autowired
    private SupplierRepository repo;

    @Autowired
    private SupplierMapper supplierMapper;

    public SupplierDto findById(Long id) {
        Supplier obj = repo.findById(id).orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Supplier.class.getName()));
        ;
        return supplierMapper.toDTO(obj); // agora vai trazer VAZIO no findById também (mas vamos arrumar)
    }

    @Transactional
    public SupplierDto insert(SupplierDto dto) {

        Supplier entity = supplierMapper.fromDTO(dto);
        repo.save(entity);
        return supplierMapper.toDTO(entity);


    }

    @Transactional
    public @Valid SupplierDto update(Long id, @Valid SupplierDto dto) {
        try {
            Supplier entity = repo.getReferenceById(id);
            supplierMapper.fromDTO(dto);
            entity = repo.save(entity);
            return new SupplierDto();
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

    public SupplierDto findByEmailAddress(String email) {
        Supplier obj = repo.findByEmailAddress(email);
        if (obj == null) {
            throw new ObjectNotFoundException(
                    "Objeto não encontrado! Id: " + obj.getEmailAddress() + ", Tipo: " + Customer.class.getName());
        }
        return supplierMapper.toDTO(obj);


    }


    @Transactional
    public Page<SupplierDto> findAllPaged(PageRequest pageRequest) {
        Page<Supplier> suppliers = repo.findAll(pageRequest);
        return suppliers.map(supplier -> supplierMapper.toDTO(supplier));
    }


    private void updateData(Supplier newObj, SupplierDto obj) {
        newObj.setName(obj.getName());
        newObj.setEmailAddress(obj.getEmailAddress());
    }


}