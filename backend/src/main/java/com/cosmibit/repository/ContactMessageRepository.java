package com.cosmibit.repository;

import com.cosmibit.model.ContactMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * MongoDB Repository for ContactMessage documents
 */
@Repository
public interface ContactMessageRepository extends MongoRepository<ContactMessage, String> {
}
