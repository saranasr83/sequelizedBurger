var express = require("express");

var db = require("../models/");

//create the router
var router = express.Router();
//create all our routes

router.get("/", function (req, res) {
    db.Burger.findAll({})
        .then(function (dbBurger) {
            // handlebars object to be sent to the template
            var hdlbrObj = {
                burgers: []
            }

            // loop through all the data that comes back from the query
            // take the obj we want and place them in an empty array
            dbBurger.forEach(function(item){
                hdlbrObj.burgers.push(item.dataValues);
            });

            // send handlebars object to index and render
            return res.render("index", hdlbrObj);
        })
});

//create
router.post("/api/burgers", function (req, res) {
    console.log("req.body", req.body);
    db.Burger.create({
        burger_name: req.body.burger_name
    })
        .then(function (dbBurger) {

            res.json(dbBurger);
        });
});

//update
router.put("/api/burgers/:id", function (req, res) {
    db.Burger.update(
    {
        devoured: true
    },
    {
        where: {
            id: req.params.id
        }
    }
    ).then(function (dbBurger) {
        // dbBurger is an array of how many items were updated
        res.json(dbBurger);
    });

});

// Export routes for server.js to use.
module.exports = router;