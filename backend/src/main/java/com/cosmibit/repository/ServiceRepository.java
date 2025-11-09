package com.cosmibit.repository;

import com.cosmibit.model.Service;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * MongoDB Repository for Service documents
 */
@Repository
public interface ServiceRepository extends MongoRepository<Service, String> {
}
