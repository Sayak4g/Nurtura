package com.springbootbackend.demo.serviceImp;

import com.springbootbackend.demo.dto.EmergencyAlertDto;
import com.springbootbackend.demo.model.Contact;
import com.springbootbackend.demo.model.EmergencyAlert;
import com.springbootbackend.demo.model.UserModel;
import com.springbootbackend.demo.repository.ContactRepo;
import com.springbootbackend.demo.repository.EmergencyAlertRepo;
import com.springbootbackend.demo.service.EmergencyAlertService;
import org.springframework.beans.factory.annotation.Autowired;
import com.springbootbackend.demo.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class EmergencyAlertServiceImp implements EmergencyAlertService {
    @Autowired
    UserRepo userRepo;
    @Autowired
    ContactRepo contactRepo;
    @Autowired
    EmergencyAlertRepo emergencyAlertRepo;
    @Override
    public String createEmergencyAlert(EmergencyAlertDto emergencyAlertDTO) {
        Optional<UserModel> userOpt = userRepo.findById(emergencyAlertDTO.getUserId());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        Optional<Contact> contactOpt = contactRepo.findById(emergencyAlertDTO.getContactId());
        if (contactOpt.isEmpty()) {
            throw new RuntimeException("Contact not found");
        }

        EmergencyAlert emergencyAlert = new EmergencyAlert();

        emergencyAlert.setUserId(userOpt.get());
        emergencyAlert.setContactId(contactOpt.get());
        emergencyAlert.setMessage(emergencyAlertDTO.getMessage());
        emergencyAlert.setLocation(emergencyAlertDTO.getLocation());

        EmergencyAlert savedAlert = emergencyAlertRepo.save(emergencyAlert);
        return savedAlert.getId();
    }
}
