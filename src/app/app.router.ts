import {Routes, RouterModule} from '@angular/router';
import {QuestionScreenComponent} from './question/question-screen.component';
import {SigninFormComponent} from './auth/signin-form.component';
import {SignupFormComponent} from './auth/signup-form.component';
import {QUESTION_ROUTES} from './question.router';

const APP_ROUTES: Routes=[
    {path:'', component:QuestionScreenComponent, pathMatch:'full'},
    {path:'signin',component:SigninFormComponent},
    {path:'signup',component:SignupFormComponent},
    {path:'question',children:QUESTION_ROUTES}
];

export const Routing= RouterModule.forRoot(APP_ROUTES);