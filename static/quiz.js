import {draggables, quiz1, quiz2} from '/static/quizzes.js';

function load(question){
    console.log(question.question_id)
    if(question.question_id == "1"){
        draggables(question)
        console.log(tracker)
    }
    else if(question.question_id == "2"){
        quiz1(question)
        console.log(tracker)
    }
    else if(question.question_id == "3"){
        quiz2(question)
    }
    else if(question.question_id == "4"){
        step3(lesson)
    }
    
}

$(document).ready(function() {
    load(question)

    $("#next-button").click(function(){
        window.location.href = "/quiz/"+question.next_quiz+""
    })
    $("#prev-button").click(function(){
        window.location.href = "/quiz/"+question.prev_quiz+""
    })
})


