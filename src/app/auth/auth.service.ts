import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable,throwError} from 'rxjs';
import urljoin from 'url-join';
import {User} from './user.model';
import {MatSnackBar} from '@angular/material';


@Injectable()

export class AuthService{
    authUrl:string;
    currentUser?:User;
    constructor(private httpClient:HttpClient,private snackBar:MatSnackBar){
        this.authUrl= urljoin(environment.apiUrl,'auth');
        if(this.isLogin()){
            const {userId, firstName, lastName, email}=JSON.parse(localStorage.getItem('user'));
            this.currentUser=new User(email,null,firstName,lastName,userId);
        }
    }

    signIn(user:User){
        const headerOptions={
            headers:new HttpHeaders({
                'Content-type':'application/json'
            })
        }
        return this.httpClient.post(urljoin(this.authUrl,'signin'),user,headerOptions)
                .pipe(
                    catchError(this.handleError)
                );
    }

    signUp(user:User){
        const headerOptions={
            headers:new HttpHeaders({
                'Content-Type':'application/json'
            })
        }

        return this.httpClient.post(urljoin(this.authUrl,'signup'),user,headerOptions)
                .pipe(
                    catchError(this.handleError)
                )
    }

    login(data,router){
        const {token,userId,firstName,lastName,email}=data;
        this.currentUser= new User(email,null,firstName,lastName);
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify({userId, firstName, lastName, email}));
        return router.navigate(['']);
    }

    isLogin(){
        return localStorage.getItem('token')!== null;
    }

    logout(router){
        localStorage.clear();
        router.navigate(['signin']);
    }

    showError(message){
        this.snackBar.open(message,'x',{duration:2500});
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

    public handleViewError(error){
        this.showError(error);
    }
}