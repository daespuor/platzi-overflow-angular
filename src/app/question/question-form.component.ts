import {Component, OnInit} from '@angular/core';
import {Question} from './question.model';
import {NgForm} from '@angular/forms';
import icons from './icons';
import {QuestionService} from './question.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
    selector:'app-question-form',
    templateUrl:'./question-form.component.html',
    styles:[`
        i{
            font-size:48px;
        }
        small{
            display:block;
        }
    `],
    providers:[QuestionService]
})

export class QuestionFormComponent implements OnInit{
    icons:Object[] = icons;
    subQuestion:any;

    constructor(private questionService:QuestionService, private router:Router, private authService:AuthService){}

    ngOnInit(){
        if(!this.authService.isLogin()){
            this.router.navigate(['signin']);
        }
    }
    getIconVersion(icon:any){
        let version;
       if(icon.versions.font.includes('plain-wordmark')){
           version='plain-wordmark';
       }else{
           version=icon.versions.font[0];
       }

       if(icon.name==='illustrator'){
           version=icon.versions.svg[0];
       }

       return version;
    }
    onSubmit(form:NgForm){
        const q= new Question(
            form.value.title,
            form.value.description,
            new Date(),
            form.value.icon
        );
        this.questionService.addQuestion(q)
        .subscribe((data:Question)=>{
            const {_id}=data;
            this.router.navigate(['question',_id]);
        },
        err=>this.authService.handleViewError(err));
    }
   
}