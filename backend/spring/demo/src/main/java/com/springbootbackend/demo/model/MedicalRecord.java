package com.springbootbackend.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "medicalRecords")
public class MedicalRecord {

    @Id
    private String id;

    @DBRef
    private UserModel userId;  // owner of the record

    private String fileUrl;
    private String fileName;
    private Date uploadedAt = new Date();

}
