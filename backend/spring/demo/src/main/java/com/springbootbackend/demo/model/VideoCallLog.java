package com.springbootbackend.demo.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "video_call_logs")
public class VideoCallLog {
    @Id
    private String id;

    @DBRef
    private UserModel caller;  // Referring to the User model for the caller

    @DBRef
    private UserModel receiver;  // Referring to the User model for the receiver

    private Date callStart;
    private Date callEnd;
    private VideoCallLogStatus status;
}
