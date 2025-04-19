package com.springbootbackend.demo.serviceImp;

import com.springbootbackend.demo.dto.ContactDto;
import com.springbootbackend.demo.model.Contact;
import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.ContactRepo;
import com.springbootbackend.demo.repository.UserRepo;
import com.springbootbackend.demo.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ContactImp implements ContactService {
@Autowired
    ContactRepo contactRepo;
@Autowired
    UserRepo userRepo;
    @Override
    public String createContact(ContactDto contactDto) {
        Optional<UserModel> optionalUser = userRepo.findById(contactDto.getUserId());
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found with ID: " + contactDto.getUserId());
        }

        UserModel user = optionalUser.get();


        Contact contact = new Contact();
        contact.setName(contactDto.getName());
        contact.setPhone(contactDto.getPhone());
        contact.setEmail(contactDto.getEmail());
        contact.setRelation(contactDto.getRelation());
        contact.setUserId(user);

        Contact savedContact = contactRepo.save(contact);
        return  savedContact.getId();

    }
}
