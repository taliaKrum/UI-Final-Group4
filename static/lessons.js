export function ingredients(lesson){
    var row = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-4' id='list'></div>")
    $.each(lesson.items, function(index,value){
        var list = $("<div>")
        list.html((index+1) + ": " + value)
        list.attr('data-name', value)
        list.draggable({
            revert : function(dropped){
                return dropped == false;
            }
 
        })
        col1.append(list)
    })
    row.append(col1)

    var col2 = $("<div class='col-md-4' id='shopping'><div id='shopping' class='shopping'>Shopping List</div></div>")
    row.append(col2)
    $("#details").append(row)
}
export function step1(lesson){
     $.each(lesson.items, function(index,value){
        var row = $("<div class='row'></div><br>")
        var col1 = $("<div class='col-md-2'><img src='https://t3.ftcdn.net/jpg/04/26/13/92/360_F_426139222_xZ74I0LZQUcdKOsvvmdfrd0tE2JKl2JZ.jpg'></div>")
        var col2 = $("<div class='col-md-4'></div>")
        
        col2.append(value)
        row.append(col1)
        row.append(col2)
        $("#details").append(row)
    })
    var row3 = $("<div class='row'></div><br>")
    var col = $("<div class='col-md-8'></div>")
    col.append(lesson.text)
    row3.append(col)
    $("#details").append(row3)
}
export function step2(lesson){
    var r = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-3'></div>")
    var col2 = $("<div class='col-md-5'><img class='step2-img' src='https://natashaskitchen.com/wp-content/uploads/2020/05/Vanilla-Cupcakes-7-728x1092.jpg'></div>")
    var col3 = $("<div class='col-md-3'></div>")
    
    $.each(lesson.items, function(index,value){
       var row = $("<div class='row step2-text'></div>")
       row.append(value)
       
       if(index % 2 == 0){
           col1.append(row)
       }else{
           col3.append(row)
       }
   })
   r.append(col1)
   r.append(col2)
   r.append($("<div class='col-md-1'></div>"))
   r.append(col3)
   $("#details").append(r)
}

export function step3(lesson){
    var r = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-3'></div>")
    var col2 = $("<div class='col-md-5'><img src='https://natashaskitchen.com/wp-content/uploads/2020/05/Vanilla-Cupcakes-8-728x546.jpg'></div>")
    var col3 = $("<div class='col-md-3'></div>")
    
    $.each(lesson.items, function(index,value){
       var row = $("<div class='row step3-text'></div>")
       row.append(value)
       
       if(index % 2 == 0){
           col1.append(row)
       }else{
           col3.append(row)
       }
   })
   r.append(col1)
   r.append(col2)
   r.append($("<div class='col-md-1'></div>"))
   r.append(col3)
   $("#details").append(r)
}

