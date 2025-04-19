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
@Document(collection = "activity_logs")
public class ActivityLog {
    @Id
    private String id;

    @DBRef
    private UserModel userId;  // Reference to User model

    private String type;  // "game" or "habit"
    private String activityName;  // Optional field
    private Integer score;  // Optional field
    private Date timestamp = new Date();  // Defaults to current date/time

}
