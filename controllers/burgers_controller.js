var express = require("express");

var db = require("../models/");

//create the router
var router = express.Router();
//create all our routes

router.get("/", function (req, res) {
    db.Burger.findAll({})
        .then(function (dbBurger) {
            return res.render("index", dbBurger);
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

    db.Burger.update({
        where: {
            id: req.body.id
        }
    }).then(function (dbBurger) {
        res.json(dbBurger);
    });

});

// Export routes for server.js to use.
module.exports = router;