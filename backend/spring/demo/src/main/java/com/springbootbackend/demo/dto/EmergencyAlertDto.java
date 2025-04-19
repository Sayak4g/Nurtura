package com.springbootbackend.demo.dto;

import com.springbootbackend.demo.model.EmergencyAlert;
import com.springbootbackend.demo.model.Location;

import java.util.Date;

public class EmergencyAlertDto {

    private String userId;     // User ID
    private String contactId;  // Contact ID
    private String message;    // Emergency message
    private Location location; // Emergency location
    private Date createdAt;


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContactId() {
        return contactId;
    }

    public void setContactId(String contactId) {
        this.contactId = contactId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
