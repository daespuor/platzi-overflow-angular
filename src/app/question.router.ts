import {QuestionScreenComponent} from './question/question-screen.component';
import {QuestionDetailComponent} from './question/question-detail.component';
import {QuestionFormComponent} from './question/question-form.component';

export const QUESTION_ROUTES=[
    {path:'',component:QuestionScreenComponent},
    {path:'new', component:QuestionFormComponent},
    {path:':id',component:QuestionDetailComponent}
];

