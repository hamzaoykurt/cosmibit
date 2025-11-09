package com.cosmibit.controller;

import com.cosmibit.model.Service;
import com.cosmibit.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Service endpoints
 */
@RestController
@RequestMapping("/api/v1/services")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cosmibit.frontend.url}")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    /**
     * GET /api/v1/services - Retrieve all services
     */
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {
        List<Service> services = serviceRepository.findAll();
        return ResponseEntity.ok(services);
    }

    /**
     * GET /api/v1/services/{id} - Retrieve a service by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable String id) {
        return serviceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
