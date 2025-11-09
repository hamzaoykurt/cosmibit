package com.cosmibit.repository;

import com.cosmibit.model.TeamMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * MongoDB Repository for TeamMember documents
 */
@Repository
public interface TeamMemberRepository extends MongoRepository<TeamMember, String> {
}
