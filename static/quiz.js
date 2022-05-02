import {quiz1, quiz2, quiz3, quiz4, quizEnd} from '/static/quizzes.js';

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
        quiz3(question)
    }
    else if(question.question_id == "4"){
        quiz4(question)
    }
    else if(question.question_id == "5"){
        quizEnd(question)
    }
    
}

$(document).ready(function() {
    load(question)

    if(question.question_id == 5)
        $("#next-button").html("Back to start!");


    $("#next-button").click(function(){
        if (question.question_id != 5)
        window.location.href = "/quiz/"+question.next_quiz+""
        else 
        window.location.href = "/quiz/1"
    })
    $("#prev-button").click(function(){
        if (question.question_id == 1)
        window.location.href = "/learn/2"
        else if (question.question_id == 2)
        window.location.href = "/learn/3"
        else if (question.question_id == 3)
        window.location.href = "/learn/1"
        else if (question.question_id == 4)
        window.location.href = "/learn/4"
    })
})


