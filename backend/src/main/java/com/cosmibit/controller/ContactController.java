package com.cosmibit.controller;

import com.cosmibit.dto.ContactMessageRequest;
import com.cosmibit.model.ContactMessage;
import com.cosmibit.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for Contact endpoints
 */
@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cosmibit.frontend.url}")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    /**
     * POST /api/v1/contact - Submit a contact form message
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContactMessage(
            @Valid @RequestBody ContactMessageRequest request) {

        // Create and save the contact message
        ContactMessage contactMessage = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .message(request.getMessage())
                .submissionDate(LocalDateTime.now())
                .build();

        ContactMessage savedMessage = contactMessageRepository.save(contactMessage);

        // Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Thank you for contacting us! We'll get back to you soon.");
        response.put("id", savedMessage.getId());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
