package com.springbootbackend.demo.repository;

import com.springbootbackend.demo.model.EmergencyAlert;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyAlertRepo extends MongoRepository<EmergencyAlert , String> {
}
