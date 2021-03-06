"use strict";
module.exports = function (sequelize, DataTypes) {
    var UserRole = sequelize.define('users_roles', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            field: 'user_id',
        },
        role_id: {
            type: DataTypes.INTEGER,
            field: 'role_id'
        }
    }, {
        tableName: 'users_roles',
        timestamps: false
    });
    return UserRole;
};
//# sourceMappingURL=users_roles.js.map