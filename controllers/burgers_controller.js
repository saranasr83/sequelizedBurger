var express = require("express");

var burger = require("../models/burger.js");

//create the router
var router = express.Router();
//create all our routes

router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log("hbsObject", hbsObject);
        res.render("index", hbsObject)
    });
});

router.post("/api/burgers", function (req, res) {
    console.log("req.body",req.body);
    burger.create(
        [
            "burger_name"
        ], 
        [
            req.body.burger_name
        ], 
        function (result) {
            res.json({ id: result.insertId });
        }
    );
});
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    burger.update({
        devoured: true
    }, condition, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});



// Export routes for server.js to use.
module.exports = router;