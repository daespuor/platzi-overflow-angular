import {Component, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Answer} from './answer.model';
import {User} from '../auth/user.model';
import {AuthService} from '../auth/auth.service';
import {Question} from '../question/question.model';
import {QuestionService} from '../question/question.service';
import SmoothScroll from 'smooth-scroll';
import {Router} from '@angular/router';

@Component({
    selector:'app-answer-form',
    templateUrl:'./answer-form.component.html',
    styles:[` 
        form{
            margin-top: 20px;
        }
    `],
    providers:[QuestionService]
})

export class AnswerFormComponent {
    @Input() question:Question;
    smoothScroll:SmoothScroll;
   

    constructor(private questionService:QuestionService, private authService:AuthService, private router:Router){ 
        this.smoothScroll= new SmoothScroll();
    }

    onSubmit(form:NgForm){
        if(!this.authService.isLogin()){
            this.router.navigate(['signin']);
        }
        const answer= new Answer(
            form.value.description,
            this.question
        );
        this.questionService.addAnswer(answer)
        .subscribe((data:Answer)=>{
            this.question.answers.unshift(data);
            const title= document.querySelector("#answerTitle");
            this.smoothScroll.animateScroll(title);
            form.reset();
        },
        err=>this.authService.handleViewError(err));

    }

  
}