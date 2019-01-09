import {Component, Input} from '@angular/core';
import {Answer} from './answer.model';


@Component({
    selector:'app-answers-list',
    templateUrl:'./answers-list.component.html',
    styleUrls:['./answers-list.component.css']
})

export class AnswersListComponent{
    @Input() answers: Answer[]
}