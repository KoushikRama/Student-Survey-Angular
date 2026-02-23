// Team:
// 1. Koushik Rama(G01508456)
// 2. Abhijith Devulapally(G01520039)

// Contains business logic for creating, retrieving, updating, and deleting Survey records.


package com.example.studentsurveybackend.service;

import com.example.studentsurveybackend.entity.Survey;
import com.example.studentsurveybackend.repository.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SurveyService {
    // CRUD operations
    @Autowired
    private SurveyRepository surveyRepository;

    // Creating a survey
    public Survey createSurvey(Survey survey) {
        return surveyRepository.save(survey);
    }

    //Reading Surveys, All of them
    public List<Survey> getAllSurvey() {
        return surveyRepository.findAll();
    }
    //Reading survey by id
    public Survey getSurveyById(Long id) {
        return surveyRepository.findById(id).orElse(null);
    }

    //Updating a Survey by id
    public Survey updateSurvey(Long id, Survey updatedSurvey) {
        Survey existingSurvey = surveyRepository.findById(id).orElse(null);

        if (existingSurvey == null) {return null;}

        existingSurvey.setFirstName(updatedSurvey.getFirstName());
        existingSurvey.setLastName(updatedSurvey.getLastName());
        existingSurvey.setEmail(updatedSurvey.getEmail());
        existingSurvey.setTelephone(updatedSurvey.getTelephone());

        existingSurvey.setStreetAddress(updatedSurvey.getStreetAddress());
        existingSurvey.setCity(updatedSurvey.getCity());
        existingSurvey.setState(updatedSurvey.getState());
        existingSurvey.setZip(updatedSurvey.getZip());

        existingSurvey.setDateOfSurvey(updatedSurvey.getDateOfSurvey());

        existingSurvey.setLikedMost(updatedSurvey.getLikedMost());
        existingSurvey.setInterestedIn(updatedSurvey.getInterestedIn());
        existingSurvey.setRecommendation(updatedSurvey.getRecommendation());

        existingSurvey.setComments(updatedSurvey.getComments());

        return surveyRepository.save(existingSurvey);
    }


    //Deleting a survey using ID
    public void deleteSurvey(Long id) {
        surveyRepository.deleteById(id);
    }




}
