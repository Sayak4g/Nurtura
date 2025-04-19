package com.springbootbackend.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "users")
public class UserModel {
    @Id
    private String id;

    private String name;
    private int age;
    private String email;
    private String phoneNo;
    private String gender;
    private String height;
    private String weight;
    private Date dateOfBirth;
    private String maritalStatus;
    private String bloodGroup;
    private String allergies;
    private String medicalConditions;
    private String medications;
    private String address;
    private String city;
    private String state;
    private String country;
    private String zipCode;

    private String profilePic;

    @DBRef
    private Contact emergencyContact;

    @DBRef
    private List<Contact> contacts;
    @DBRef
    private List<MedicalRecord> medicalRecords;
    @DBRef
    private List<EmergencyAlert> emergencyAlerts;
    @DBRef
    private List<VideoCallLog> videoCallLog;

}