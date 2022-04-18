export function draggables(question){

    var row = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-4' id='list1'></div>")
    $.each(question.Bowl1, function(index,value){
        var list1 = $("<div>")
        list1.html((index+1) + ": " + value)
        list1.attr('data-name', value)
        list1.draggable({
            revert : "valid"
        })
        col1.append(list1)
    })

    var col2 = $("<div class='col-md-4' id='list2'></div>")
    $.each(question.Bowl2, function(index,value){
        var list2 = $("<div>")
        list2.html((index+1) + ": " + value)
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

    $('#' + 1 + '').click(function () {
        $(this).css('background-color', 'red')
    });
    $('#' + 2 + '').click(function () {
        $(this).css('background-color', 'red')
    });
    $('#' + 3 + '').click(function () {
        $(this).css('background-color', 'green')
    });
}

export function quiz2(question){
    
}

