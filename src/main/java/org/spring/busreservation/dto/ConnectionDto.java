package org.spring.busreservation.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class ConnectionDto {
    private Long id;
    @NotEmpty
    private String startPlace;
    @NotEmpty
    private String endPlace;
    @Min(0)
    private double distance;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    @NotNull
    private Date departureDate;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    @NotNull
    private Date arrivalDate;
    @Min(0)
    private int places;
    private int takenPlaces;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartPlace() {
        return startPlace;
    }

    public void setStartPlace(String startPlace) {
        this.startPlace = startPlace;
    }

    public String getEndPlace() {
        return endPlace;
    }

    public void setEndPlace(String endPlace) {
        this.endPlace = endPlace;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public Date getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(Date arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public int getPlaces() {
        return places;
    }

    public void setPlaces(int places) {
        this.places = places;
    }

    public int getTakenPlaces() {
        return takenPlaces;
    }

    public void setTakenPlaces(int takenPlaces) {
        this.takenPlaces = takenPlaces;
    }
}
