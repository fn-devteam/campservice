package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.FindCEPDto;
import com.campigoto.campservice.dto.SupplierDto;
import com.campigoto.campservice.dto.SupplierFilterDto;
import com.campigoto.campservice.entities.Customer;
import com.campigoto.campservice.entities.Supplier;
import com.campigoto.campservice.mappers.SupplierMapper;
import com.campigoto.campservice.repositories.SupplierRepository;
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

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SupplierService {

    private final ViaCepService viaCepService;
    private final SupplierRepository repo;
    private final SupplierMapper supplierMapper;

    @Transactional(readOnly = true)
    public SupplierDto findById(Long id) {
        Supplier obj = repo.findById(id).orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! Id: " + id + ", Tipo: " + Supplier.class.getName()));
        return supplierMapper.toDTO(obj);
    }

    @Transactional
    public SupplierDto insert(SupplierDto dto) throws Exception {

        getAddressIfNotInformed(dto);
        Supplier entity = supplierMapper.fromDTO(dto);
        repo.save(entity);
        return supplierMapper.toDTO(entity);


    }

    @Transactional
    public @Valid SupplierDto update(Long id, @Valid SupplierDto dto) {

        try {

            Supplier entity = supplierMapper.fromDTO(dto);
            entity.setId(id);
            entity = repo.save(entity);
            return supplierMapper.toDTO(entity);
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
    public SupplierDto findByEmailAddress(String email) {
        Supplier obj = repo.findByEmailAddress(email);
        if (obj == null) {
            throw new ObjectNotFoundException(
                    "Objeto não encontrado! Id: " + email + ", Tipo: " + Customer.class.getName());
        }
        return supplierMapper.toDTO(obj);


    }

    @Transactional(readOnly = true)
    public Page<SupplierDto> findAllPaged(SupplierFilterDto filter, Pageable pageable) {
        Page<Supplier> list = repo.findByTerm(filter, pageable);
        return list.map(supplierMapper::toDTO);
    }


    public List<SupplierDto> findByZipCode(String cep) {

        return repo.findByZipCode(cep).stream().map(supplierMapper::toDTO).collect(Collectors.toList());
    }

    private void getAddressIfNotInformed(SupplierDto dto) throws Exception {
        if ((dto.getZipCode() != null && dto.getZipCode().isBlank()) && (dto.getAddress() == null || dto.getAddress().isEmpty())) {
            FindCEPDto address = viaCepService.findAddressByCep(dto.getZipCode());
            dto.setAddress(address.getLogradouro());
            dto.setCity(address.getLocalidade());
            dto.setState(address.getUf());
            dto.setDistrict(address.getBairro());
        }
    }

}