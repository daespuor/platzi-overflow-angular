import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {User} from './user.model';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
@Component({
    selector:'app-signup-form',
    templateUrl:'./signup-form.component.html',
    styles:[`
        p{
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(241,179,179,0.3);
            background: rgba(241,179,179,1);
            width: 90%;
            margin:40px auto;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
        }
    `]
})

export class SignupFormComponent implements OnInit{
    signupForm: FormGroup;
    passNotEqual:boolean;
    hide:boolean;
    checkhide:boolean;

    constructor(private authService:AuthService, private router:Router){}

    ngOnInit(){
        this.hide=true;
        this.checkhide=true;
        this.signupForm= new FormGroup({
            email: new FormControl(null,[
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]),
            password: new FormControl(null,Validators.required),
            firstName: new FormControl(null,Validators.required),
            lastName: new FormControl(null,Validators.required),
            passwordCheck: new FormControl(null,Validators.required)
        });
    }

    onSubmit(){
        const form=this.signupForm
        if(form.valid){
            if(form.value.password===form.value.passwordCheck){
                 this.passNotEqual=false;
                const user= new User(
                            form.value.email,
                            form.value.password,
                            form.value.firstName,
                            form.value.lastName);
                this.authService.signUp(user)
                .subscribe(
                    (data:any)=>{
                        this.authService.login(data,this.router);
                    },
                    err=>console.log(err)
                )
            }else{
                this.passNotEqual=true;
            }
        }
    }
}