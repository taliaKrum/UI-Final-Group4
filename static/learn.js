

$(document).ready(function() {
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
})