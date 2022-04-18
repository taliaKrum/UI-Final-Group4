import {draggables, quiz1, quiz2} from '/static/quizzes.js';

function load(question){
    console.log(question.question_id)
    if(question.question_id == "1"){
        var flag = draggables(question)
        console.log(flag)
        if (flag){
            $.ajax({
                url: '/add_correct',
                dataType : "json",
                data : JSON.stringify(1),
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function(response) {
                    console.log(response);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
    }else if(question.question_id == "2"){
        quiz1(question)
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


