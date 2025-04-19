package com.springbootbackend.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "reminders")
public class Reminder {
    @Id
    private String id;

    @DBRef
    private UserModel userId;  // Reference to User model (user who owns this reminder)

    private String type;  // Can be "meal", "hydration", "exercise"
    private String time;  // Time of the reminder (e.g., "08:00 AM")
    private String frequency = "daily";  // Can be "daily" or "weekly", default is "daily"
    private boolean active = true;  // Whether the reminder is active or not, default is true

}
