package com.cosmibit.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * MongoDB Document representing a portfolio project
 */
@Document(collection = "projects")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    private String id;

    private String title;

    private String description;

    private String imageUrl;

    private ProjectStatus status;

    private List<String> technologies;

    /**
     * Project status enum
     */
    public enum ProjectStatus {
        COMPLETED,
        UPCOMING,
        IN_PROGRESS
    }
}
