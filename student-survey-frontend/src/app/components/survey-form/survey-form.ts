import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SurveyService } from '../../services/survey';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './survey-form.html',
  styleUrl: './survey-form.css',
})
export class SurveyForm implements OnInit {

  surveyForm!: FormGroup;
  likedMostOptions = [
    'Students',
    'Location',
    'Campus',
    'Atmosphere',
    'Dorm Rooms',
    'Sports'
  ];

  isEditMode=false;
  currentId: number | null = null;
  private surveyService = inject(SurveyService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private fb: FormBuilder,){}

  ngOnInit(): void{
    this.surveyForm = this.fb.group({
    firstName: this.fb.control('', {
      validators: [Validators.required]
    }),
    lastName: this.fb.control('', {
      validators: [Validators.required]
    }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email]
    }),
    telephone: this.fb.control('', {
      validators: [Validators.required]
    }),

    streetAddress: this.fb.control('', {
      validators: [Validators.required]
    }),
    city: this.fb.control('', {
      validators: [Validators.required]
    }),
    state: this.fb.control('', {
      validators: [Validators.required]
    }),
    zip: this.fb.control('', {
      validators: [Validators.required]
    }),

    dateOfSurvey: this.fb.control('', {
      validators: [Validators.required]
    }),

    likedMost: this.fb.array([]),

    interestedIn: this.fb.control('', {
      validators: [Validators.required]
    }),
    recommendation: this.fb.control('', {
      validators: [Validators.required]
    }),

    comments: this.fb.control('')
  });
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.currentId = +idParam;
      this.loadSurvey(this.currentId);
    }
  }

  get likedMostFormArray(): FormArray{
    return this.surveyForm.get('likedMost') as FormArray;
  }

  onLikedMostChange(option: string, event: Event): void{
    const checkbox = event.target as HTMLInputElement;

    if(checkbox.checked){
      this.likedMostFormArray.push(this.fb.control(option));
    }else{
      const index = this.likedMostFormArray.controls.findIndex(
        ctrl => ctrl.value === option
      );
      if(index !== -1){
        this.likedMostFormArray.removeAt(index);
      }
    }
  }

    loadSurvey(id: number): void {
    this.surveyService.getSurveyById(id).subscribe({
      next: (data: any) => {
        // Clear likedMost array first
        this.likedMostFormArray.clear();

        // Handle likedMost string -> array
        const likedMostArray =
          data.likedMost && typeof data.likedMost === 'string'
            ? data.likedMost.split(',').map((x: string) => x.trim())
            : [];

        likedMostArray.forEach((val: string) => {
          this.likedMostFormArray.push(this.fb.control(val));
        });

        console.log(data)

        // Patch other fields
        this.surveyForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          telephone: data.telephone,
          streetAddress: data.streetAddress,
          city: data.city,
          state: data.state,
          zip: data.zip,
          dateOfSurvey: data.dateOfSurvey,
          interestedIn: data.interestedIn,
          recommendation: data.recommendation,
          comments: data.comments
        });
      },
      error: (error: any) => {
        console.error('Error loading survey:', error);
        alert('Failed to load survey for editing.');
      }
    });
  }

  onSubmit(): void {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.currentId != null) {
      // UPDATE existing survey
      this.surveyService.updateSurvey(this.currentId, this.surveyForm.value).subscribe({
        next: (response: any) => {
          console.log('Survey updated:', response);
          alert('Survey updated successfully!');
          this.router.navigate(['/surveys']);
        },
        error: (error: any) => {
          console.error('Error updating survey:', error);
          alert('Error updating survey.');
        }
      });
    } else {
      // CREATE new survey
      this.surveyService.submitSurvey(this.surveyForm.value).subscribe({
        next: (response: any) => {
          console.log('Survey saved:', response);
          alert('Survey submitted successfully!');
          this.surveyForm.reset();
          this.router.navigate(['/surveys']);
        },
        error: (error: any) => {
          console.error('Error submitting survey:', error);
          alert('Error submitting survey.');
        }
      });
    }
  }


}
