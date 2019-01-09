import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from './user.model';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
@Component({
    selector: 'app-signin-form',
    templateUrl:'./signin-form.component.html'
})

export class SigninFormComponent implements OnInit{
    signinForm: FormGroup;
    subAuth:any;
    ngOnInit(){
        this.signinForm = new FormGroup({
            email: new FormControl(null,[
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]),
            password: new FormControl(null,Validators.required)
        });
    }

    constructor(private authService:AuthService, private router:Router){ }

    onSubmit(){
      
        if(this.signinForm.valid){
            const {email, password} = this.signinForm.value;
            const user = new User(email,password);
            this.authService.signIn(user)
            .subscribe((data:any)=>{
                this.authService.login(data,this.router)},
                err=>console.log(err)
            );
        }
    }

   
}