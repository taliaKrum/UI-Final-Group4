import {ingredients, step1, step2, step3, frost_ing,frost_step1} from '/static/lessons.js';

function load(lesson){
    console.log(lesson.lesson_id)
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
    }
    
}

$(document).ready(function() {
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
})