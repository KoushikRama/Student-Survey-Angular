// Team:
// 1. Koushik Rama(G01508456)
// 2. Abhijith Devulapally(G01520039)

// This Angular component displays all submitted student surveys retrieved from the Spring Boot backend. 
// It provides features to fetch all surveys from the database, display them in a formatted GMU-themed table, edit an existing survey entry, and delete a survey entry with confirmation. 
// The component uses SurveyService for backend communication and Angular Router for navigating to the edit form. Loading and error states are included to enhance user experience.


import { Component, inject, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './survey-list.html',
  styleUrl: './survey-list.css',
})
export class SurveyList implements OnInit {

  surveys: any[] = [];
  loading = false;
  errorMessage='';

  private surveyService = inject(SurveyService);
  private router = inject(Router);

  onEdit(id: number): void {
    this.router.navigate(['/survey', id]);
  }


  ngOnInit(): void {
    this.loadSurveys();
  }
  loadSurveys():void{
    this.loading= true;
    this.errorMessage='';
    this.surveyService.getAllSurveys().subscribe({
      next:(data: any[])=>{
        this.surveys = data;
        this.loading=false;
      },
      error:(error:any)=>{
        console.error('Error loading surveys:', error);
        this.errorMessage = 'Failed to load surveys.';
        this.loading = false;
      }
    });
  }

  onDelete(id: number): void {
    if (!confirm('Are you sure you want to delete this survey?')) {
      return;
    }

    this.surveyService.deleteSurvey(id).subscribe({
      next: () => {
        this.surveys = this.surveys.filter(s => s.id !== id);
      },
      error: (error: any) => {
        console.error('Error deleting survey:', error);
        this.errorMessage = 'Failed to delete survey.';
      }
    });
  }

}
