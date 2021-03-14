module.exports = function(sequelize, DataTypes) {
    const Labourer = sequelize.define("Labourer", {
        first_name:{
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        dob:{
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        driver_license:{
            type: DataTypes.STRING(12),
            allowNull:true,
            defaultValue: false,
        },
        whitecard:{
            type: DataTypes.STRING(12),
            allowNull:false,
        },
        skills_experience:{
            type: DataTypes.TEXT,
        },
        img_reference:{
            type: DataTypes.STRING,
        },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references:{
        //         model: User,
        //         key: id,
        //     },
        // }
    },{
        timestamps: false
    });

    return Labourer;
};