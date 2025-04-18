package com.springbootbackend.demo.repository;

import com.springbootbackend.demo.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<UserModel, String> {
}
