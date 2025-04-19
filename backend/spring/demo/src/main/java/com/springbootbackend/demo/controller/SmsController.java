package com.springbootbackend.demo.controller;

import com.springbootbackend.demo.serviceImp.SmsServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sms")
public class SmsController {
    @Autowired
    SmsServiceImp smsServiceImp;
    @PostMapping("/send")
    public String sendSms(
            @RequestParam String phone,
            @RequestParam String message) {
        return smsServiceImp.sendSms(phone, message);
    }

}
