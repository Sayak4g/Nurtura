package com.springbootbackend.demo.controller;

import com.springbootbackend.demo.dto.EmergencyAlertDto;
import com.springbootbackend.demo.model.EmergencyAlert;
import com.springbootbackend.demo.repository.EmergencyAlertRepo;
import com.springbootbackend.demo.service.EmergencyAlertService;
import com.springbootbackend.demo.serviceImp.SmsServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("emergencyAlert")
@RestController
public class EmergencyAlertController {
    @Autowired
    EmergencyAlertService emergencyAlertService;
    @Autowired
    EmergencyAlertRepo emergencyAlertRepo;
    @Autowired
    SmsServiceImp smsServiceImp;

    @PostMapping
    public String saveEmergencyAlertDetails(@RequestBody EmergencyAlertDto emergencyAlertDto){
        return emergencyAlertService.createEmergencyAlert(emergencyAlertDto);
    }

    @PostMapping("/send/{alertId}")
    public String sendAlert(@PathVariable String alertId) {
        EmergencyAlert alert = emergencyAlertRepo.findById(alertId).orElse(null);

        if (alert != null) {

            String contactPhoneNumber = alert.getContactId().getPhone();
            String message = alert.getMessage();
            smsServiceImp.sendSms(contactPhoneNumber , message);

            return "Emergency alert sent successfully!";
        } else {
            return "Emergency alert not found!";
        }
    }


}
