package com.springbootbackend.demo.controller;

import com.springbootbackend.demo.dto.ContactDto;
import com.springbootbackend.demo.model.Contact;
import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.ContactRepo;
import com.springbootbackend.demo.service.ContactService;
import com.springbootbackend.demo.serviceImp.CloudinaryServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/contacts")
public class ContactController {
    @Autowired
    ContactService contactService;
    @Autowired
    ContactRepo contactRepo;
    @Autowired
    CloudinaryServiceImp imgUpload;
    @PostMapping("/create")
    public String createContact(@RequestBody ContactDto contactDto) {
        String contactId = contactService.createContact(contactDto);
        return contactId;
    }

    @GetMapping("/user/{userId}")
    public List<Contact> getContactsByUserId(@PathVariable String userId) {
        return contactRepo.findByUserId_Id(userId);
    }
    @PostMapping("/uploadProfilePic/{id}")
    public void uploadProfilePic(@PathVariable String id , @RequestParam MultipartFile profilePic)throws IOException {
        imgUpload.uploadContactProfilePic(id , profilePic);
    }

     @GetMapping("/getProfilePic/{id}")
        public String getSingleProfilePic(@PathVariable String id){
         Contact contact = contactRepo.findById(id).orElseThrow(()-> new RuntimeException("user not found "));
         return contact.getProfilePic();
        }

    }
