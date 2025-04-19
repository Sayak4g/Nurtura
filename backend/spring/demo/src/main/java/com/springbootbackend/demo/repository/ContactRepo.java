package com.springbootbackend.demo.repository;

import com.springbootbackend.demo.model.Contact;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@Repository
public interface ContactRepo extends  MongoRepository<Contact , String> {
    List<Contact> findByUserId_Id(String userId);

}
