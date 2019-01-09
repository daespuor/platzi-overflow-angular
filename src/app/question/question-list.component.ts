import {Component, OnInit, Input} from '@angular/core';
import { Question } from './question.model';
import {QuestionService} from './question.service';


@Component({
    selector: 'app-question-list',
    templateUrl:'./question-list.component.html',
    styles:[
        `i{
            font-size: 48px;
         }
         i.help{
             width: 48px !important;
             height: 48px !important;
             font-size: 48px !important;
             padding: 0;
         }
        `
    ],
    providers: [QuestionService]
})

export class QuestionListComponent implements OnInit{
    questions:Question[];
    loading: boolean = true;
    @Input() sort: String;
    constructor(private questionService:QuestionService){}

    ngOnInit():void{
        this.questionService.getQuestions(this.sort)
        .subscribe((data:Question[])=>{
            this.questions=data;
            this.loading=false;
        });

    }

   
   
}