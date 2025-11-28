// Team:
// 1. Koushik Rama (G01508456)
// 2. Abhijith Devulapally (G01520039)

// This Angular service handles all HTTP communication with the Spring Boot backend. 
// It provides methods for creating, retrieving, updating, and deleting survey records. 
// The service formats the likedMost field for transmission and centralizes all API endpoint interactions for the frontend.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {

  private apiUrl = 'http://localhost:8080/api/surveys'; // your backend URL

  constructor(private http: HttpClient) {}

  // SUBMIT: creates a survey
  submitSurvey(formValue: any): Observable<any> {
    const payload = {
      ...formValue,
      likedMost: (formValue.likedMost as string[]).join(',')
    };

    return this.http.post(this.apiUrl, payload);
  }

  // READ: get all surveys
  getAllSurveys(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // READ: get survey by id (for future edit feature)
  getSurveyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // DELETE: delete survey by id
  deleteSurvey(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // UPDATE: update survey (for future)
  updateSurvey(id: number, formValue: any): Observable<any> {
    const payload = {
      ...formValue,
      likedMost: (formValue.likedMost as string[]).join(',')
    };

    return this.http.put<any>(`${this.apiUrl}/${id}`, payload);
  }
}
