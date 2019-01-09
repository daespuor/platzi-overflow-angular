import {Component} from '@angular/core';

@Component({
    selector:'app-question-screen',
    templateUrl:'./question-screen.component.html',
    styles:[` 
    i{
        font-size: 48px;
     }
     i.help{
         width: 48px !important;
         height: 48px !important;
         font-size: 48px !important;
         padding: 0;
     }
    .add-button{
        position: fixed;
        right:30px;
        font-size:30px;
        bottom: 30px;
    }`]
})

export class QuestionScreenComponent{
}