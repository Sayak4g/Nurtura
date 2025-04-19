package com.springbootbackend.demo.repository;

import com.springbootbackend.demo.model.VideoCallLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoCallLogRepo extends MongoRepository<VideoCallLog , String> {
}
