import {quiz1, quiz2, quizEnd} from '/static/quizzes.js';

function load(question){
    console.log(question.question_id)
    if(question.question_id == "1"){
        quiz1(question)
        console.log(tracker)
    }
    else if(question.question_id == "2"){
        quiz2(question)
        console.log(tracker)
    }
    else if(question.question_id == "3"){
        quizEnd(question)
    }
    // else if(question.question_id == "4"){
    //     step3(lesson)
    // }
    
}

$(document).ready(function() {
    load(question)

    if(question.question_id == 3)
        $("#next-button").html("Back to start of quiz!");


    $("#next-button").click(function(){
        if (question.question_id != 3)
        window.location.href = "/quiz/"+question.next_quiz+""
        else 
        window.location.href = "/quiz/1"
    })
    // $("#prev-button").click(function(){
    //     window.location.href = "/quiz/"+question.prev_quiz+""
    // })
})


