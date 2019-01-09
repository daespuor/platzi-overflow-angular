import { Component,OnInit, OnDestroy } from '@angular/core';
import { Question } from './question.model';
import {QuestionService} from './question.service';
import {ActivatedRoute} from '@angular/router';
import 'moment/locale/es';

@Component({
    selector: 'app-question-detail',
    templateUrl: './question-detail.component.html',
    styleUrls: ['./question-detail.component.css'],
    providers:[QuestionService]
})

export class QuestionDetailComponent implements OnInit,OnDestroy{
    question:Question;
    loading:boolean = true;
    sub:any;
    subQuestion:any;

    constructor(private questionService:QuestionService,
                private router:ActivatedRoute){}

    ngOnInit(){
        this.sub=this.router.params.subscribe(
            params=>{
                this.subQuestion=this.questionService.getQuestion(params.id)
                .subscribe((data:Question)=>{
                    this.question=data;
                    this.loading=false;
                })
            }
        )
    }

    ngOnDestroy(){
        this.sub.unsubscribe();
        this.subQuestion.unsubscribe();
    }

}