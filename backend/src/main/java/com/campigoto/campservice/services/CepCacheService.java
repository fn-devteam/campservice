package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.CEPDto;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CepCacheService {

    private final Map<String, CEPDto> _cache = new HashMap<>();

    public CEPDto getCep(String cep) {

        if (_cache.isEmpty())
            return null;

        if (!_cache.containsKey(cep))
            return null;

        return _cache.get(cep);
    }

    public void saveCep(CEPDto dto) {
        _cache.put(dto.getCep(), dto);
    }
}
