package com.campigoto.campservice.services;

import com.campigoto.campservice.dto.FindCEPDto;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CepCacheService {

    private final Map<String, FindCEPDto> _cache = new HashMap<>();

    public FindCEPDto getCep(String cep) {

        if (_cache.isEmpty())
            return null;

        if (!_cache.containsKey(cep))
            return null;

        return _cache.get(cep);
    }

    public void saveCep(FindCEPDto dto) {
        _cache.put(dto.getCep(), dto);
    }
}
