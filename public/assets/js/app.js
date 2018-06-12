// click event for craeting a new burger
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

// helper function for creating a burger
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

// click event fo updating a burger 
$(document).on("click",".change-devoured", function(e){
    e.preventDefault();
    var updatedBurger = {
        id: $(this).attr("data-id"),
        name: $(this).siblings(".burger-name").text(),
        devoured: true
    }
    console.log(updatedBurger);
    updateBurger(updatedBurger);
})

// helper function for updating a burger
function updateBurger(updatedBurger){
    $.ajax("/api/burgers/"+ updatedBurger.id, {
        type: "PUT"
    })
    .then(function(dbBurger){        
        if(dbBurger.length === 1 && dbBurger[0] === 1){
           $("[data-id='"+ updatedBurger.id +"']").parent().remove();
            burgerTemplate(updatedBurger);
        }
        else {
            alert("try again");
        } 
    })
}

// helper function for creating html for a burger being displayed
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