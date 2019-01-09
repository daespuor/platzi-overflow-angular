import {Injectable} from '@angular/core';
import {Question} from './question.model';
import {Answer} from '../answer/answer.model';
import {environment} from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import urljoin from 'url-join';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';



@Injectable()

export class QuestionService{
    private questionsUrl: string;

    constructor(private http:HttpClient){
        this.questionsUrl=urljoin(environment.apiUrl,'questions');
    }

    getQuestions(sort:String):Observable<Question[]>{
        return this.http.get<Question[]>(`${this.questionsUrl}?sort=${sort}`)
        .pipe(
            catchError(this.handleError)
        );
    }

    getQuestion(id:string):Observable<Question>{
        return this.http.get<Question>(urljoin(this.questionsUrl,id))
        .pipe(
            catchError(this.handleError)
        );
    }

    addQuestion(question:Question):Observable<Question>{
        const headerOptions={
            headers:new HttpHeaders({
                'Content-type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            })
        }
        return this.http.post<Question>(this.questionsUrl,question,headerOptions)
                .pipe(
                    catchError(this.handleError)
                );
    }

    addAnswer(answer:Answer):Observable<Answer>{

        const newAnswer=Object.assign(answer,{question:{
            _id:answer.question._id
        }});

        const headerOptions={
            headers:new HttpHeaders({
                'Content-type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            })
        }
       
        
        return this.http.post<Answer>(urljoin(this.questionsUrl,answer.question._id.toString(),'answers'),newAnswer,headerOptions)
                .pipe(
                    catchError(this.handleError)
                );
    }

    private handleError(error:HttpErrorResponse){
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${error.error}`);
          }
          // return an observable with a user-facing error message
          return throwError(
            error.error.message);
    }
}