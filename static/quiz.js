import {quiz1, quiz2, quiz3, quizEnd, quizReset} from '/static/quizzes.js';

function load(question){
    console.log(question.question_id)
    if(question.question_id == "1"){
        quizReset()
        quiz1(question)
        console.log(tracker)
    }
    else if(question.question_id == "2"){
        quiz2(question)
        console.log(tracker)
    }
    else if(question.question_id == "3"){
        quiz3(question)
    }
    else if(question.question_id == "4"){
        quizEnd(question)
    }
    
}

$(document).ready(function() {
    load(question)

    if(question.question_id == 4)
        $("#next-button").html("Back to start!");


    $("#next-button").click(function(){
        if (question.question_id != 4)
        window.location.href = "/quiz/"+question.next_quiz+""
        else 
        window.location.href = "/quiz/1"
    })
    $("#prev-button").click(function(){
        if (question.question_id == 1)
        window.location.href = "/learn/2"
        else if (question.question_id == 2)
        window.location.href = "/learn/6"
        else if (question.question_id == 3 || question.question_id == 4)
        window.location.href = "/learn/1"
    })

    $("#progress").append("("+question.question_id+"/4)")

})


