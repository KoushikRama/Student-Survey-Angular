// Team:
// 1. Koushik Rama(G01508456)
// 2. Abhijith Devulapally(G01520039)
// Provides CRUD database operations for Survey entities using Spring Data JPA.

package com.example.studentsurveybackend.repository;

import com.example.studentsurveybackend.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends JpaRepository<Survey,Long> {
}
