
let shoppingList = []
let popUpList = []

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

function initPopup(items) {
    $("#popup").empty();
    $.each(items, function(i, val) {
        let pic = $("<img class='ing-img' id='ingPic"+i+"' src="+val+">")
        $("#popup").append(pic);
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

    var col2 = $("<div class='col-md-4' class='shop'><div id='shopping' class='shopping'>Shopping Cart</div><div id='shlist'></div></div>")
    row.append(col2)
    $("#details").append(row)

    var col3 = $("<div id='popup' class='col-md-4'></div>")
    row.append(col3)

    $("#shopping").droppable({
        drop: function(event, ui) {
            let ing = ui.draggable.text();
            let i = lesson.items.indexOf(ing);
            shoppingList.push(lesson.items[i]);
            popUpList.push(lesson.extra_images[i]);
            initShopping(shoppingList);
            initPopup(popUpList);
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
    var col = $("<div id='directions' class='col-md-8 note'></div>")
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
   //r.append($("<div class='col-md-1'></div>"))
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
   //r.append($("<div class='col-md-1'></div>"))
   r.append(col3)
   $("#details").append(r)
}
export function frost_ing(lesson){
    
    var row = $("<div class='row'></div><br>")
    var col1 = $("<div class='col-md-3'><img src='https://www.recipetineats.com/wp-content/uploads/2020/09/Perfect-vanilla-cupcake.jpg'></div>")
    var col2 = $("<div class='col-md-1 arrow'><img src='https://thumbs.dreamstime.com/b/yellow-right-arrow-icon-yellow-right-arrow-icon-flat-style-isolated-white-background-125890820.jpg'></div>")
    var col3 = $("<div class='col-md-3'><img src='https://www.noracooks.com/wp-content/uploads/2022/03/sq-3.jpg'></div>")
    row.append(col1)
    row.append($("<div class='col-md-1'></div>"))
    row.append(col2)
    row.append($("<div class='col-md-1'></div>"))
    row.append(col3)

    var row2 = $("<div class='row'></div><br><br>")
    var col4 = $("<div class='col-md-5 subtitle'></div><br>")
    col4.append(lesson.text)
    row2.append(col4)
    $("#details").append(row)
    $("#details").append(row2)

    var ig_imgs = [
        'https://i5.walmartimages.com/asr/b7b17d39-ef58-4f26-94b3-1aa1752abaf3_3.e2d12a9eeeacb871a4b872d2c3107755.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
        'https://www.meijer.com/content/dam/meijer/product/0002/10/0061/22/0002100061223_2_A1C1_0600.png',
        'https://blogs.oncolink.org/wp-content/uploads/sugar.2-810x476-1.jpg'
    ]
    $.each(lesson.items, function(index,value){
        var row = $("<div class='row'></div><br>")
        var col1 = $("<div class='col-md-2'><img src='" + ig_imgs[index]+ "'></div>")
        var col2 = $("<div class='col-md-4'></div>")
    
        col2.append(value)
        row.append(col1)
        row.append($("<div class='col-md-1'></div>"))
        row.append(col2)
        $("#details").append(row)
   })
}

export function frost_step1(lesson){
    var ig_imgs = [
        'https://www.myfrugalhome.com/wp-content/uploads/2020/01/heavywhippingcream1200.jpg',
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F12%2F2021%2F08%2F25%2FIs-Cream-Cheese-Healthy-GettyImages-177721417-2000.jpg',
        'https://blogs.oncolink.org/wp-content/uploads/sugar.2-810x476-1.jpg'

    ]
    var beat_imgs = [
        'https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&poi=face&url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1543354489%2F1811w-whipped-cream-getty.jpg%3Fitok%3DxTXBTUiT',
        'https://cookingwithcarlee.com/wp-content/uploads/2016/03/cream-cheese-frosting-with-beaters-720x540.jpg',
        'https://sugarfreelondoner.com/wp-content/uploads/2020/07/keto-cheesecake-fluff-step-3.jpg'
    ]
    $.each(lesson.items, function(index,value){
        var row = $("<div class='row'></div><br>")
        var col1 = $("<div class='col-md-2'><img src='" + ig_imgs[index]+ "'></div>")
        var col2 = $("<div class='col-md-4'></div>")
        var col3 = $("<div class='col-md-2'><img src='" + beat_imgs[index]+ "'></div>")
        
        col2.append(value)
        row.append(col1)
        row.append(col2)
        row.append(col3)
        $("#details").append(row)
   })
}
