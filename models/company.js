module.exports = function(sequelize, DataTypes) {
    const Company = sequelize.define("Company", {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        company_name:{
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        abn: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true,
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references:{
        //         model: User,
        //         key: id,
        //     }
        // }
    },{
        timestamps: false
    });

    return Company;
};