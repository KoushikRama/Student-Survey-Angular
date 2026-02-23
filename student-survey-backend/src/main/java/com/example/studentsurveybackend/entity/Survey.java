// Team:
// 1. Koushik Rama(G01508456)
// 2. Abhijith Devulapally(G01520039)
// Represents the Survey entity mapped to the database table and includes validation rules for all survey fields.

package com.example.studentsurveybackend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
@Table(name="surveys")
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "First name is required")
    @Pattern(regexp = "^[A-Za-z ]+$",message = "Firstname must contain letters only")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Last name must contain only letters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Telephone number is required")
    @Pattern(
            regexp = "^[0-9+()\\- ]{7,20}$",
            message = "Invalid telephone number"
    )
    private String telephone;

    @NotBlank(message = "Street address is required")
    private String streetAddress;

    @NotBlank(message = "City is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "City must contain only letters")
    private String city;

    @NotBlank(message = "State is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "State must contain only letters")
    private String state;

    @NotBlank(message = "Zip code is required")
    @Pattern(regexp = "^[0-9]{5}$", message = "Zip must be exactly 5 digits")
    private String zip;

    @NotNull(message = "Date of survey is required")
    private LocalDate dateOfSurvey;

    // Checkboxes (students, location, campus, atmosphere, dorm rooms, sports)
    @Column(length = 500)
    private String likedMost;

    // Radio button: friends, tv, internet, other
    @Column(length = 500)
    private String interestedIn;
    // DataList: Likely, Very Likely, Unlikely
    @Column(length = 500)
    private String recommendation;

    @Column(length = 1000)
    @Size(max = 1000, message = "Comments cannot exceed 1000 characters")
    private String comments;

    public Survey() {
    }

    public long getId() {return id;}
    public void setId(long id) {this.id = id;}

    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public String getTelephone() {return telephone;}
    public void setTelephone(String telephone) {this.telephone = telephone;}

    public String getStreetAddress() {return streetAddress;}
    public void setStreetAddress(String streetAddress) {this.streetAddress = streetAddress;}

    public String getCity() {return city;}
    public void setCity(String city) {this.city = city;}

    public String getState() {return state;}
    public void setState(String state) {this.state = state;}

    public String getZip() {return zip;}
    public void setZip(String zip) {this.zip = zip;}

    public LocalDate getDateOfSurvey() {return dateOfSurvey;}
    public void setDateOfSurvey(LocalDate dateOfSurvey) {this.dateOfSurvey = dateOfSurvey;}

    public String getLikedMost() {return likedMost;}
    public void setLikedMost(String likedMost) {this.likedMost = likedMost;}

    public String getInterestedIn() {return interestedIn;}
    public void setInterestedIn(String interestedIn) {this.interestedIn = interestedIn;}

    public String getRecommendation() {return recommendation;}
    public void setRecommendation(String recommendation) {this.recommendation = recommendation;}

    public String getComments() {return comments;}
    public void setComments(String comments) {this.comments = comments;}

}
