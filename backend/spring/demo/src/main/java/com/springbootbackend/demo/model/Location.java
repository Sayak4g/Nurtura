package com.springbootbackend.demo.model;

public class Location {
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
