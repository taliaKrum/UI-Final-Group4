
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
    var drop
     $.each(lesson.items, function(index,value){
        row = $("<div id="+index+" class='row'></div><br>")
        var col1 = $("<div class='col-md-2'><img src='https://t3.ftcdn.net/jpg/04/26/13/92/360_F_426139222_xZ74I0LZQUcdKOsvvmdfrd0tE2JKl2JZ.jpg'></div>")
        var col2 = $("<div class='col-md-4'></div>")
        drop = $("<div id='ingDrop"+index+"' class='col-md-5'></div>") 
        
        col2.append(value)
        row.append(col1)
        row.append(col2)
        row.append(drop)
        $("#details").append(row)
    })

    var col3 = $("<div class='col-md-12'></div>")
    $.each(lesson.extra_images, function(i, val){
        let bowl = $("<img id='click"+i+"' class='clickme ingredient ing-img' src="+val+">")
        let measure 
        bowl.on("click", function () {
            if(bowl.prop('id')=='click0'){
                $("#mflour").remove()
                measure = $("<div id='mflour'>1 1/4 cups of flour</div>")
                $("#ingDrop0").append(measure)
            }
            else if(bowl.prop('id')=='click1'){
                $("#mbp").remove()
                measure = $("<div id='mbp'>1 1/4 tsp of baking powder</div>")
                $("#ingDrop0").append(measure)
            }
            else if(bowl.prop('id')=='click2'){
                $("#msalt").remove()
                measure = $("<div id='msalt'>1/2 tsp of salt</div>")
                $("#ingDrop0").append(measure)
            }
            else if(bowl.prop('id')=='click3'){
                $("#mbutter").remove()
                measure = $("<div id='mbutter'>1/2 cup of butter</div>")
                $("#ingDrop1").append(measure)
            }
            else if(bowl.prop('id')=='click4'){
                $("#msugar").remove()
                measure = $("<div id='msugar'>3/4 cup of sugar</div>")
                $("#ingDrop1").append(measure)
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

