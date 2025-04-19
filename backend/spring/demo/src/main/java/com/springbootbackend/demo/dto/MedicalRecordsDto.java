package com.springbootbackend.demo.dto;

public class MedicalRecordsDto {
    private String userId;
    private String fileName;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}
