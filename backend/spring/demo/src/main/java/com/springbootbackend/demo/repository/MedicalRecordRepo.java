package com.springbootbackend.demo.repository;

import com.springbootbackend.demo.model.MedicalRecord;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepo extends MongoRepository<MedicalRecord , String> {
    List<MedicalRecord> findByUserId_Id(String userId);
}
