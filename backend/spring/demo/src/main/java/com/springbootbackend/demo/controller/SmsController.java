package com.springbootbackend.demo.controller;

import com.springbootbackend.demo.model.PushSubscription;
import com.springbootbackend.demo.serviceImp.PushNotificationService;
import com.springbootbackend.demo.serviceImp.SmsServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sms")
public class SmsController {
    @Autowired
    private PushNotificationService pushService;

    @PostMapping("/send")
    public ResponseEntity<String> sendNotification(@RequestBody PushSubscription subscription) {
        try {
            pushService.sendNotification(subscription, "Test notification from Spring Boot!");
            return ResponseEntity.ok("Notification sent!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed: " + e.getMessage());
        }
    }
}
