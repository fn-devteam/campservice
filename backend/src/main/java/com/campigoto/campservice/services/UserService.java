package com.campigoto.campservice.services;


import com.campigoto.campservice.dto.UserDto;
import com.campigoto.campservice.dto.UserInsertDto;
import com.campigoto.campservice.dto.UserUpdateDto;
import com.campigoto.campservice.entities.User;
import com.campigoto.campservice.mappers.UserMapper;
import com.campigoto.campservice.repositories.UserRepository;
import com.campigoto.campservice.services.exceptions.DatabaseException;
import com.campigoto.campservice.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Transactional
    public UserDto findById(Long id) {
        Optional<User> obj = repository.findById(id);
        User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
        return userMapper.toDto(entity);
    }

    @Transactional
    public UserDto insert(UserInsertDto dto) {
        User entity = userMapper.fromInsertDto(dto);
        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
        entity = repository.save(entity);
        return userMapper.toDto(entity);
    }

    public Page<UserDto> findAllPaged(Pageable pageable) {
        Page<User> list = repository.findAll(pageable);
        return list.map(userMapper::toDto);
    }


    @Transactional
    public UserDto update(Long id, UserUpdateDto dto) {

        try {
            User entity = userMapper.fromUpdateDto(dto);
            entity.setId(id);
            entity = repository.save(entity);
            return userMapper.toDto(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);

        }
    }

    @Transactional
    public void delete(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id not found " + id);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("Integrity violation");
        }
    }
}


