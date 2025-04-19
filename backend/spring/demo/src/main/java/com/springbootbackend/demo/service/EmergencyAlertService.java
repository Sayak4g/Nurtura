package com.springbootbackend.demo.service;

import com.springbootbackend.demo.dto.EmergencyAlertDto;
import org.springframework.stereotype.Service;

@Service
public interface EmergencyAlertService {
    public String createEmergencyAlert(EmergencyAlertDto emergencyAlertDTO);
}
