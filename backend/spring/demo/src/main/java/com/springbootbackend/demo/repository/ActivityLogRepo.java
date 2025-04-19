package com.springbootbackend.demo.repository;

import com.springbootbackend.demo.model.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityLogRepo extends MongoRepository<ActivityLog , String> {
}
