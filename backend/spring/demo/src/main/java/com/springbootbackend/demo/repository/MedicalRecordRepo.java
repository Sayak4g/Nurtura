package com.springbootbackend.demo.repository;

import com.springbootbackend.demo.model.MedicalRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalRecordRepo extends MongoRepository<MedicalRecord , String> {
}
