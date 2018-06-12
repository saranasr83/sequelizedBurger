// Import the ORM to create functions that will interact with the burger database.
//create the code that will call the ORM functions using burger specific input for the ORM.
var orm = require("../config/orm.js");

var burger = {
    all: function (cb) {
        orm.all("burgers", function (res) {
            cb(res);
        });
    },

    create: function (cols, vals, cb) {
        orm.create("burgers", cols, vals, function (res) {
            cb(res);

        });
    },
    update: function(objColVals, condition, cb) {
       
        orm.update("burgers", objColVals, condition, function(res) {
          cb(res);
        });
    }
}

module.exports = burger;