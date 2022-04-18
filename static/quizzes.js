export function draggables(question){

    var row = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-4' id='list1'></div>")
    $.each(question.Bowl1, function(index,value){
        var list1 = $("<div>")
        list1.html(value)
        list1.attr('data-name', value)
        list1.draggable({
            revert : "valid"
        })
        col1.append(list1)
    })

    $.each(question.Bowl2, function(index,value){
        var list2 = $("<div>")
        list2.html(value)
        list2.attr('data-name', value)
        list2.draggable({
            revert : "valid"
        })
        col1.append(list2)
    })
    row.append(col1)

    var col3 = $("<div class='col-md-4'><div id='bowl1' class='shopping'>Bowl 1</div></div>")
    row.append(col3)

    var col4 = $("<div class='col-md-4'><div id='bowl2' class='shopping'>Bowl 2</div></div>")
    row.append(col4)

    $("#details").append(row)
 
    $( "#bowl1" ).droppable({
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "list1" )
            .html( "Dropped!" );
      }
    });
    $( "#bowl2" ).droppable({
        classes: {
          "ui-droppable-active": "ui-state-active",
          "ui-droppable-hover": "ui-state-hover"
        },
        drop: function( event, ui ) {
          $( this )
            .addClass( "ui-state-highlight" )
            .find( "list1" )
              .html( "Dropped!" );
        }
      });

      $("#details").append("<br/>")

      var col5 = $("<div class='col-md-12'><div id='temp' class='temp'>Write the ingridients that should go in the bowl 1 (hint: dry ingridients) below with spaces between words! </div></div>")
      var col6 = $("<input class='col-md-12'id='bowl1_input'/>")
      $("#details").append(col5)
      $("#details").append(col6)

      $(':input').on('propertychange input', function (e) {
        var valueChanged = false;
    
        if (e.type=='propertychange') {
            valueChanged = e.originalEvent.propertyName=='value';
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            
            var str = $(this).val().toLowerCase();
            if(~str.indexOf("flour") & ~str.indexOf("baking") & ~str.indexOf("salt")){
                $(this).css('background-color', 'green')
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
            else {
                $(this).css('background-color', 'red')
            }
            
        }
    });
}

export function quiz1(question){
    console.log("quiz1 on roll")
    var row = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-4' id='list1'></div>")
    $.each(question.items, function(index,value){
        var list1 = $("<div id= '" + (index + 1) + "'>")
        list1.html((index+1) + ": " + value)
        col1.append(list1)
    })
    row.append(col1)
    $("#details").append(row)
    var flag = 0

    $('#' + 1 + '').click(function () {
        $(this).css('background-color', 'red')
        flag += 1
    });
    $('#' + 2 + '').click(function () {
        $(this).css('background-color', 'red')
        flag += 1
    });
    $('#' + 3 + '').click(function () {
        $(this).css('background-color', 'green')
        if (flag < 2){
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
        });
}

export function quiz2(question){
    var row = $("<h1>Your Quiz Score is " + tracker + " / 2 </div>")
    $("#details").append(row)

}

