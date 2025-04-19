package com.springbootbackend.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Date;
import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "contacts")
public class Contact {

    @Id
    private String id;

    @DBRef
    private UserModel userId; // Owner of this contact

    private String name;
    private String phone;
    private String email;
    private String relation; // e.g., Family, Doctor, Friend
    private String profilePic;

}