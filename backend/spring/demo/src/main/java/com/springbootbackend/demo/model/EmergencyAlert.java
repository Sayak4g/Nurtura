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
@Document(collection = "emergency_alerts")
public class EmergencyAlert {

    @Id
    private String id;

    @DBRef
    private UserModel userId; // Reference to User

    @DBRef
    private Contact contactId; // Reference to Contact

    private String message;

    private Location location;

    private Date createdAt = new Date(); // Automatically sets current date

    // Getters and Setters

    public static class Location {
        private Double lat;
        private Double lng;

        // Constructors
        public Location() {}

        public Location(Double lat, Double lng) {
            this.lat = lat;
            this.lng = lng;
        }

        // Getters and Setters
        public Double getLat() {
            return lat;
        }

        public void setLat(Double lat) {
            this.lat = lat;
        }

        public Double getLng() {
            return lng;
        }

        public void setLng(Double lng) {
            this.lng = lng;
        }
    }


}
