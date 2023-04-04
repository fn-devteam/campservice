package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.BuscaCEPDto;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CepCacheService {

    private final Map<String, BuscaCEPDto> _cache = new HashMap<>();

    public BuscaCEPDto getCep(String cep) {

        if (_cache.isEmpty())
            return null;

        if (!_cache.containsKey(cep))
            return null;

        return _cache.get(cep);
    }

    public void saveCep(BuscaCEPDto dto) {
        _cache.put(dto.getCep(), dto);
    }
}
