import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { QuestionDetailComponent } from './question/question-detail.component';
import {AnswersListComponent } from './answer/answers-list.component';
import {AnswerFormComponent } from './answer/answer-form.component';
import {SigninFormComponent} from './auth/signin-form.component';
import {SignupFormComponent} from './auth/signup-form.component';
import { MomentModule } from 'ngx-moment';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {QuestionListComponent} from './question/question-list.component';
import {QuestionFormComponent} from './question/question-form.component';
import {QuestionScreenComponent} from './question/question-screen.component';
import { HttpClientModule } from '@angular/common/http';
import {Routing} from './app.router';
import {AuthService} from './auth/auth.service';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDetailComponent,
    AnswersListComponent,
    AnswerFormComponent,
    SigninFormComponent,
    SignupFormComponent,
    QuestionListComponent,
    QuestionFormComponent,
    QuestionScreenComponent
  ],
  imports: [
    BrowserModule,
    MomentModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
