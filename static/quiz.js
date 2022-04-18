import {draggables} from '/static/quizzes.js';

function load(question){
    console.log(question.question_id)
    if(question.question_id == "1"){
        draggables(question)
    }else if(question.question_id == "2"){
        step1(lesson)
    }
    else if(question.question_id == "3"){
        step2(lesson)
    }
    else if(question.question_id == "4"){
        step3(lesson)
    }
    
}

$(document).ready(function() {
    load(question)
})


