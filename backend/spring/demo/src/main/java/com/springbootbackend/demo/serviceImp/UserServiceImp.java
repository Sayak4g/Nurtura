package com.springbootbackend.demo.serviceImp;

import com.springbootbackend.demo.dto.UserDto;
import com.springbootbackend.demo.model.Contact;
import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.ContactRepo;
import com.springbootbackend.demo.repository.UserRepo;
import com.springbootbackend.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    ContactRepo contactRepo;

    @Override
    public String createUser(UserDto userDto) {
        UserModel user = new UserModel();

        user.setName(userDto.getName());
        user.setAge(userDto.getAge());
        user.setEmail(userDto.getEmail());
        user.setPhoneNo(userDto.getPhoneNo());
        user.setGender(userDto.getGender());
        user.setHeight(userDto.getHeight());
        user.setWeight(userDto.getWeight());
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setMaritalStatus(userDto.getMaritalStatus());
        user.setBloodGroup(userDto.getBloodGroup());
        user.setAllergies(userDto.getAllergies());
        user.setMedicalConditions(userDto.getMedicalConditions());
        user.setMedications(userDto.getMedications());
        user.setAddress(userDto.getAddress());
        user.setCity(userDto.getCity());
        user.setState(userDto.getState());
        user.setCountry(userDto.getCountry());
        user.setZipCode(userDto.getZipCode());

        if (userDto.getEmergencyContactId() != null) {

            Contact emergencyContact = contactRepo.findById(userDto.getEmergencyContactId()).orElse(null);
            user.setEmergencyContact(emergencyContact);
        }

        UserModel savedUser = userRepo.save(user);
        return "User created with ID: " + savedUser.getId();
    }



}
