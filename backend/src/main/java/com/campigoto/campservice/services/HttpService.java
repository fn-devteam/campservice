package com.campigoto.campservice.services;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class HttpService {

    private final RestTemplate restTemplate = new RestTemplate();

    public <T> ResponseEntity<T> get(String url, Class<T> responseType, Object... uriVariables) {
        HttpHeaders headers = buildHeader();
        HttpEntity<Void> entity = new HttpEntity(null, headers);

        return restTemplate.exchange(url, HttpMethod.GET, entity, responseType, uriVariables);
    }

    private HttpHeaders buildHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
