
let shoppingList = []
let bowl0 = []
let bowl1 = []

function initShopping(items) {
    $("#shlist").empty();
    $.each(items, function(i, val) {
        let ing = $("<div id='draggedIng'>"+val+"</div>")
        ing.draggable({
            revert: "invalid"
        });
        $("#shlist").append(ing);
    })
}

function initBowl(i, items) {
    if (i==0){
        $("#ingDrop0").empty();
        $.each(items, function(i, val) {
            let ing = $("<div id='draggedIng'>"+val+"</div>")
            ing.draggable({
                revert: "invalid"
            });
            $("#ingDrop0").append(ing);
        })
    }
    else {
        $("#ingDrop1").empty();
        $.each(items, function(i, val) {
            let ing = $("<div id='draggedIng'>"+val+"</div>")
            ing.draggable({
                revert: "invalid"
            });
            $("#ingDrop1").append(ing);
        })
    }
}

export function ingredients(lesson){
    var row = $("<div class='row'></div>")
    var col1 = $("<div class='col-md-4' id='list'></div>")
    $.each(lesson.items, function(index,value){
        var list = $("<div class='ingredient'>")
        // list.html((index+1) + ": " + value)
        list.html(value)
        list.attr('data-name', value)
        list.draggable({
            revert : function(dropped){
                return dropped == false;
            }
        })
        col1.append(list)
    })
    row.append(col1)

    var col2 = $("<div class='col-md-4' class='shop'><div id='shopping' class='shopping'>Shopping List</div><div id='shlist'></div></div>")
    row.append(col2)
    $("#details").append(row)

    $("#shopping").droppable({
        drop: function(event, ui) {
            let ing = ui.draggable.text();
            let i = lesson.items.indexOf(ing);
            shoppingList.push(lesson.items[i]);
            initShopping(shoppingList);
            console.log(shoppingList)
        }
    })
}

export function step1(lesson){
    let row
     $.each(lesson.items, function(index,value){
        row = $("<div id="+index+" class='row'></div><br>")
        var col1 = $("<div class='col-md-2'><img src='https://t3.ftcdn.net/jpg/04/26/13/92/360_F_426139222_xZ74I0LZQUcdKOsvvmdfrd0tE2JKl2JZ.jpg'></div>")
        var col2 = $("<div class='col-md-4'></div>")
        var drop = $("<div id='ingDrop"+index+"' class='col-md-5'>Drag Correct Ingredients Here:</div>") 
        
        col2.append(value)
        row.append(col1)
        row.append(col2)
        row.append(drop)
        $("#details").append(row)
    })

    var col3 = $("<div class='col-md-12'></div>")
    $.each(lesson.extra_images, function(i, val){
        let bowl = $("<img id="+i+" class='ingredient ing-img' src="+val+">")
        // bowl.html(val)
        // bowl.attr('data-name', val)
        bowl.draggable({
            revert : function(dropped){
                return dropped == false;
            }
        })
        col3.append(bowl)
    })

    var row3 = $("<div class='row'></div><br>")
    var col = $("<div id='directions' class='col-md-8'></div>")
    col.append(lesson.text)
    col.append(col3)
    row3.append(col)
    $("#details").append(row3)

    $("#ingDrop0").droppable({
        drop: function(event, ui) {
            let ing = ui.draggable.prop('id');
            //IF ING IS BETWEEN INDEX
            bowl0.push(lesson.extra_images[ing]);
            initBowl(0, bowl0);
            console.log(bowl0)
        }
    })
    $("#ingDrop1").droppable({
        drop: function(event, ui) {
            let ing = ui.draggable.prop('id');
            //IF ING IS BETWEEN INDEX then push
            bowl1.push(lesson.extra_images[ing]);
            initBowl(1, bowl1);
            console.log(bowl1)
        }
    }) 
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

export function step4(lesson){
    
}

