import {ingredients, step1, step2, step3, frost_ing,frost_step1} from '/static/lessons.js';

function load(lesson){
    console.log(lesson.lesson_id)
    var elem = document.getElementById("myBar");
    var width = parseInt(lesson.lesson_id)
    elem.style.width = width / 7 * 100 + "%";

    if(lesson.lesson_id == "1"){
        ingredients(lesson)
    }else if(lesson.lesson_id == "2"){
        step1(lesson)
    }
    else if(lesson.lesson_id == "3"){
        step2(lesson)
    }
    else if(lesson.lesson_id == "4"){
        step3(lesson)
    }else if(lesson.lesson_id == "5"){
        frost_ing(lesson)
    }
    else if(lesson.lesson_id == "6"){
        frost_step1(lesson)
    }else{
        var row = $("<div class='row'></div>")
        row.append($("<a class='quiz-enter' href='/quiz/1'>Ready for a Quiz? Enter the Quiz here</a>"))
        $("#details").append(row)
    }

    
}

$(document).ready(function() {
    if(lesson.lesson_id == "1"){
        document.getElementById("prev-button").disabled = true;
    }
    else if(lesson.lesson_id == "7"){
        document.getElementById("next-button").disabled = true;
    }
    if(lesson.lesson_id != "1" && lesson.lesson_id != "2"){
        var lesson_img = document.getElementById("lesson-image");
        lesson_img.style.width = "500px";
        lesson_img.style.height = "auto";
        lesson_img.style.display = "block";
        lesson_img.style.marginLeft = "auto";
        lesson_img.style.marginRight = "auto";

    }
    
    load(lesson)
    $("#next-button").click(function(){
        if(lesson.next_lesson == "end"){
            console.log("end")
            window.location.href = "/quiz/1"
        }
        else {
            window.location.href = "/learn/"+lesson.next_lesson+""
        }
        //can deal with exceptions here with different templates???
    })
    $("#prev-button").click(function(){
        window.location.href = "/learn/"+lesson.prev_lesson+""
    })

    $("#progress").append("("+lesson.lesson_id+"/7)")
})