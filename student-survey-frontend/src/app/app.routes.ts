import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SurveyForm } from './components/survey-form/survey-form';
import { SurveyList } from './components/survey-list/survey-list';

export const routes: Routes = [
    { path:'', component: Home},
    { path:'survey', component:SurveyForm},
    { path: 'survey/:id', component: SurveyForm },   // edit existing
    { path: 'surveys', component: SurveyList},
    { path: '**', redirectTo: ''}
];
