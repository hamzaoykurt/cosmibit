package com.cosmibit.repository;

import com.cosmibit.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * MongoDB Repository for Project documents
 */
@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    /**
     * Find projects by status
     */
    List<Project> findByStatus(Project.ProjectStatus status);

    /**
     * Find projects by technology
     */
    List<Project> findByTechnologiesContaining(String technology);
}
