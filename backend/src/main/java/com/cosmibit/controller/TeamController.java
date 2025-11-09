package com.cosmibit.controller;

import com.cosmibit.model.TeamMember;
import com.cosmibit.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Team endpoints
 */
@RestController
@RequestMapping("/api/v1/team")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cosmibit.frontend.url}")
public class TeamController {

    private final TeamMemberRepository teamMemberRepository;

    /**
     * GET /api/v1/team - Retrieve all team members
     */
    @GetMapping
    public ResponseEntity<List<TeamMember>> getAllTeamMembers() {
        List<TeamMember> teamMembers = teamMemberRepository.findAll();
        return ResponseEntity.ok(teamMembers);
    }

    /**
     * GET /api/v1/team/{id} - Retrieve a team member by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<TeamMember> getTeamMemberById(@PathVariable String id) {
        return teamMemberRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
