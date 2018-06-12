$("#submit-burger").on("click", function(e){
    e.preventDefault();
    newBurger = {
        burger_name: $("#newburgername").val().trim()
    }

    if(newBurger.burger_name.length > 0){
        console.log(newBurger);
       createBurger(newBurger);
    }
})


function createBurger(newBurger){
    
    $.post("/api/burgers", newBurger, function(burgerId){
        // append new burger to html
        var createdBurger = {
            name:newBurger.burger_name,
            devoured: false,
            id: burgerId.id
        }
        console.log(createdBurger);
        burgerTemplate(createdBurger);
        $("#newburgername").val("");
    });
}


$(document).on("click",".change-devoured", function(e){
    e.preventDefault();
    var updatedBurger = {
        id: $(this).attr("data-id"),
        name: $(this).siblings(".burger-name").text(),
        devoured: true
    }
    var burgerID = $(this).attr("data-id");

    updateBurger(updatedBurger);
})


function updateBurger(updatedBurger){
    
    $.ajax("/api/burgers/"+ updatedBurger.id, {
        type: "PUT"
    })
    .then(function(burger, statusText, xhr){
        console.log(statusText === "success" && xhr.status === 200);
        if(statusText === "success" && xhr.status === 200){
           $("[data-id='"+ updatedBurger.id +"']").parent().remove();
            burgerTemplate(updatedBurger);
        } 
    })
}



function burgerTemplate(burger){
    var li = $("<li>");
    var p = $("<p>")
    p.text(burger.name);
    p.addClass("burger-name");

    var button = $("<button>");

    // TURNARY OPERATOR (CONDITION)? TRUE DO THIS : ELSE DO THIS
    burger.devoured ? button.text("Devoured!").attr("disabled", true).addClass("disabled") : button.text("Devour it!")
    
    button.addClass("change-devoured");
    button.attr("data-id", burger.id);
    button.attr("data-devoured", burger.devoured);
    $(li).append(p, button);

    burger.devoured ? $("#eaten").append(li) : $("#toEat").append(li)
    
    // if(burger.devoured){
    //     $("#eaten").append(li);
    // }else{
    //     $("#toEat").append(li);
    // }
    
}