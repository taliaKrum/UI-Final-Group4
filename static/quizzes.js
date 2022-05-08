function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

export function quiz1(question){

    var row = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-3'></div>")
    var lists = []
    $.each(question.Bowl1, function(index,value){
        var list1 = $("<div class='ui-widget-content' style=' cursor: move; z-index: 100; background-color: transparent;'>")
        list1.html(value)
        list1.attr('id', "list1")
        list1.draggable({
            revert : "invalid"
        })
        lists.push(list1)
    })

    $.each(question.Bowl2, function(index,value){
        var list2 = $("<div class='ui-widget-content' style=' cursor: move; z-index: 100; background-color: transparent;'>")
        list2.html(value)
        list2.attr('id', "list2")
        list2.draggable({
            revert : "invalid"
        })
        lists.push(list2)
    })

    col1.append(shuffle(lists))
    row.append(col1)

    var col3 = $("<div class='col-md-4'><div id='bowl1' class='bowl_quiz' style='z-index: 1;'>Bowl 1</div></div>")
    row.append(col3)

    var col4 = $("<div class='col-md-4'><div id='bowl2' class='bowl_quiz' style='z-index: 1;'>Bowl 2</div></div>")
    row.append(col4)

    $("#details").append(row)
    var col5 = $("<div class='col-md-12' style='margin-left: 120px; margin-top: 100px; font-size: 20px;'><div id='temp' class='temp'>Drag to the correct bowl! You have 2 chances!</div></div>")
    $("#hints").append(col5)
    
    var count = 0
    var chances = 2

    $( "#bowl1" ).droppable({
      accept: ".ui-widget-content",
      drop: function( event, ui ) {
        count++
        if($(ui.draggable).attr("id") == "list1")
            ui.draggable.css("background-color", "green")
        else {
            ui.draggable.css("background-color", "red") 
            if(chances == 2){
                chances --
                $(temp).text("Drag to the correct bowl! You have " + chances + " chance left!")
            } else if (chances == 1){
                chances --
                $(temp).text("You are out of chances :( Click Next!")
                $('#next-button').prop('disabled', false);
            }
        }
        
        if(count == 5){
            $('#next-button').prop('disabled', false);
            check_droppable()
        }
      }
    });
    $( "#bowl2" ).droppable({
        accept: ".ui-widget-content",
        drop: function( event, ui ) {
            count++
            if($(ui.draggable).attr("id") == "list2")
                ui.draggable.css("background-color", "green")
            else {
                ui.draggable.css("background-color", "red") 
                if(chances == 2){
                    chances --
                    $(temp).text("Drag to the correct bowl! You have " + chances + " chance left!")
                } else if (chances == 1){
                    chances --
                    $(temp).text("You are out of chances :( Click Next!")
                    $('#next-button').prop('disabled', false);
                }
            }
            
            if(count == 5){
                $('#next-button').prop('disabled', false);
                check_droppable()
            }
        }
      });

      $("#details").append("<br/>")

    // checking if less than 2 wrong answers 
    function check_droppable(){
        var wrongs = 0
        var els = document.getElementsByClassName("ui-widget-content");
        for(var i = 0; i < els.length; i++)
        {
            if (els[i].style.backgroundColor == "rgb(255, 0, 0)"){
                wrongs ++
                console.log("wrong up")
            } else console.log("green up")
        }

        if (wrongs < 2) {
            $(temp).text("Good job One point for you! Click Next!")
                        $.ajax({
                        url: '/add_correct',
                        dataType : "json",
                        data : JSON.stringify({
                            "quiz": 1,
                            "url": "/learn/2"
                        }),
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
    }
    
}

export function quiz2(question){
    var row = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-8' id='list1'></div>")
    var list = []
    $.each(question.items, function(index,value){
        var list1 = $("<div class='ui-widget-content' id= '" + (index + 1) + "' style='cursor: pointer; padding: 3px; background-color: transparent;'><br/>")
        list1.html(value)
        list.push(list1) 

    })

    col1.append(shuffle(list)) 
    console.log(col1)
    row.append(col1)
    $("#details").append(row)
    var chances = 2

    var col5 = $("<div class='col-md-12' style='margin-left: 120px; margin-top: 100px; font-size: 20px;'><div id='temp' class='temp'>Select the correct answer! You have 2 chances!</div></div>")
    $("#details").append("<br/>")
    $("#hints").append(col5)

    var flag = 0
    var once = 0

    $('#' + 1 + '').click(function () {
        $(this).css('background-color', 'red')
        flag += 1
        if(chances > 1 && once == 0){
            chances --
            $(temp).text("Select the correct answer! You have " + chances + " chances left!")
        } else if (chances == 1 && once == 0){
            chances --
            $(temp).text("You are out of chances :( Click Next!")
            $('#next-button').prop('disabled', false);
        }
    });
    $('#' + 2 + '').click(function () {
        $(this).css('background-color', 'red')
        flag += 1
        if(chances > 1 && once == 0){
            chances --
            $(temp).text("Select the correct answer! You have " + chances + " chances left!")
        } else if (chances == 1 && once == 0){
            chances --
            $(temp).text("You are out of chances :( Click Next!")
            $('#next-button').prop('disabled', false);
        }
    });
    $('#' + 3 + '').click(function () {
        $(this).css('background-color', 'green')
        if (flag < 2 && once == 0){
            once ++
            $('#next-button').prop('disabled', false);
            $(temp).text("Correct One point for you! Click Next!")
            $.ajax({
                url: '/add_correct',
                dataType : "json",
                data : JSON.stringify({
                    "quiz": 2,
                    "url": "/learn/6"
                }),
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
        });
}

export function quiz3(question){
    var row = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-12' id='list1'></div>")
    var lists = []
    $.each(question.items, function(index,value){
        lists.push(value)
    })
    shuffle(lists)
    var text = ""
    for (let i = 0; i < lists.length; i++) {
        if(i == lists.length - 1)
        text += lists[i]
        else 
        text += lists[i] + ", " 
    }
    console.log(text)
    var list1 = $("<div class='ui-widget-content' id='lists' style='padding: 3px; background-color: transparent;'>")
    list1.html(text)
    col1.append(list1)
    row.append(col1)
    $("#details").append(row)
    $("#details").append("<br>")


      var col5 = $("<div class='col-md-12' style='margin-top: 100px; margin-left: 20px; font-size: 18px;'><div id='temp' class='temp'>Write the correct ingridients for cupcakes below with comma between words! (choose only 4)</div></div>")
      var col6 = $("<input class='col-md-12'id='bowl1_input'/>")
      var col7 = $("<div class='col-md-12' style='margin-left: 340px; font-size: 18px;'><div id='temp1' class='temp1'>Press enter to submit the answer! You have 2 chances!</div></div>")

      $("#hints").append(col5)
      $("#details").append(col6)
      $("#details").append(col7)

      var sent = 0
      var chances = 2
      var once = 0
      var flag = 0
    
      $(':input').on('propertychange input', function (e) {
        var valueChanged = false;
    
        if (e.type=='propertychange') {
            valueChanged = e.originalEvent.propertyName=='value';
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            var str = $(this).val().toLowerCase();
            var sep_list = str.split(',')
            var counter = (str.match(/\,/g) || []).length;
            if (counter == 3 && sep_list[sep_list.length - 1].length != 0){
                $(this).css('background-color', 'green')
                flag = 1
            } else {
                $(this).css('background-color', 'red')
                flag = -1
            }
        }
    });
    
    $("#bowl1_input").on("keydown", function(event) {
        if(event.which == 13){ 
        if(flag == 1){
            console.log("pressed")
            once ++;
            chances --;
            var str = $(this).val().toLowerCase();
            var counter = (str.match(/\,/g) || []).length;
            if(~str.indexOf("flours") & ~str.indexOf("milk") & ~str.indexOf("eggs") & ~str.indexOf("vanilla") && counter==3){
                $('#next-button').prop('disabled', false);
                sent ++
                $(temp).text("Excellent work! One point for you!")
                if(sent==1){
                    $.ajax({
                        url: '/add_correct',
                        dataType : "json",
                        data : JSON.stringify({
                            "quiz": 3,
                            "url": "/learn/1"
                        }),
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
            } else {
                if(chances == 1){
                    $(temp1).text("Press enter to submit the answer! You have " + chances + " chances left!")
                } else if(chances <= 0){
                    $(temp1).text("You are out of chances :( Click Next!")
                    $('#next-button').prop('disabled', false);
                }
            }
        }
    }
    });
}

export function quiz4(question){
    var row = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-8' id='list1'></div>")
    var list = []
    $.each(question.items, function(index,value){
        var list1 = $("<div class='ui-widget-content' id= '" + (index + 1) + "' style='cursor: pointer; padding: 3px; background-color: transparent;'><br/>")
        list1.html(value)
        list.push(list1) 

    })

    col1.append(shuffle(list)) 
    console.log(col1)
    row.append(col1)
    $("#details").append(row)
    var chances = 2

    var col5 = $("<div class='col-md-12' style='margin-left: 120px; margin-top: 100px; font-size: 20px;'><div id='temp' class='temp'>Select the correct answer! You have 2 chances!</div></div>")
    $("#details").append("<br/>")
    $("#hints").append(col5)

    var flag = 0
    var once = 0

    $('#' + 1 + '').click(function () {
        $(this).css('background-color', 'red')
        flag += 1
        if(chances > 1 && once == 0){
            chances --
            $(temp).text("Select the correct answer! You have " + chances + " chances left!")
        } else if (chances == 1 && once == 0){
            chances --
            $(temp).text("You are out of chances :( Click Next!")
            $('#next-button').prop('disabled', false);
        }
    });
    $('#' + 2 + '').click(function () {
        $(this).css('background-color', 'red')
        flag += 1
        if(chances > 1 && once == 0){
            chances --
            $(temp).text("Select the correct answer! You have " + chances + " chances left!")
        } else if (chances == 1 && once == 0){
            chances --
            $(temp).text("You are out of chances :( Click Next!")
            $('#next-button').prop('disabled', false);
        }
    });
    $('#' + 3 + '').click(function () {
        $(this).css('background-color', 'green')
        if (flag < 2 && once == 0){
            once ++
            $('#next-button').prop('disabled', false);
            $(temp).text("Correct One point for you! Click Next!")
            $.ajax({
                url: '/add_correct',
                dataType : "json",
                data : JSON.stringify({
                    "quiz": 4,
                    "url": "/learn/4"
                }),
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                success: function(response) {
                    console.log(response.data);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
        });
}


export function quizEnd(counting_tracker){
    var list = []
    var nice = 0
    var row = $("<h2>Your Quiz Score is " + (4 - counting_tracker.length) + " / 4 </div>")
    list.push("</br>")
    for (var ele of counting_tracker){
        nice++
        var link = "window.location.href=" +"\"" + (ele["url"]) + "\""
        console.log(link)
        var list1 = $("<button id= '"+ ele["quiz"] +"' onclick= 'window.location.href=" + link +"'; style='padding: 3px; width:700px; margin-left: 200px; margin-top:10px; cursor: pointer; background-color: #ffc107; border-color: #ffc107;'>" + ele["name"] +"</button></br>")
        list.push(list1) 
    }
    if (nice!=0){
        var col5 = $("<div class='col-md-12' style='margin-left: 20px; margin-top: 100px; font-size: 20px;'><div id='temp' class='temp'>Click the buttons below to relearn about the questions that you got wrong!</div></div>")
    } else {
        var col5 = $("<div class='col-md-12' style='margin-left: 20px; margin-top: 100px; font-size: 20px;'><div id='temp' class='temp'>You got every quiz correct! Well Done!</div></div>")    
    }
    $("#cart").append(col5)
    $("#cart").append("<br/>")
    $("#details").append(row)
    $("#hints").append(list)
    

}

export function quizReset(){
    $.ajax({
        url: '/reset_tracker',
        dataType : "json",
        data : {
            data: "reset"
        },
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        success: function(response) {
            console.log(response.data);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

