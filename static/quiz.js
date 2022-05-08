import {quiz1, quiz2, quiz3, quiz4, quizEnd, quizReset} from '/static/quizzes.js';

function load(question, counting_tracker){
    console.log(question.question_id)
    var elem = document.getElementById("myBar");
    var width = parseInt(question.question_id)
    elem.style.width = width / 5 * 100 + "%";

    if(question.question_id == "1"){
        quizReset()
        quiz1(question)
    }
    else if(question.question_id == "2"){
        quiz2(question)
    }
    else if(question.question_id == "3"){
        quiz3(question)
    }
    else if(question.question_id == "4"){
        quiz4(question)
    }
    else if(question.question_id == "5"){
        $('#next-button').prop('disabled', false);
        quizEnd(counting_tracker)
    }
    
}

$(document).ready(function() {
    load(question, counting_tracker)

    if(question.question_id == 5)
        $("#next-button").html("Back to Home!");


    $("#next-button").click(function(){
        if (question.question_id != 5)
        window.location.href = "/quiz/"+question.next_quiz+""
        else 
        window.location.href = "/"
    })
    $("#prev-button").click(function(){
        if (question.question_id == 1)
        window.location.href = "/learn/2"
        else if (question.question_id == 2)
        window.location.href = "/learn/6"
        else if (question.question_id == 3)
        window.location.href = "/learn/1"
        else if (question.question_id == 4)
        window.location.href = "/learn/4"
        else if (question.question_id == 5){
            window.location.href = "/"
        }
    })

    if(question.question_id < 5)
    $("#progress").append("("+question.question_id+"/4)")

})


