package com.springbootbackend.demo.repository;

import com.springbootbackend.demo.model.Reminder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReminderRepo extends MongoRepository<Reminder , String> {
}
