module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     allowNull: false,
        //     autoincrement: true,
        //     max: 10
        // },
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    })
    return Burger;
}