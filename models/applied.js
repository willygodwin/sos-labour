
module.exports = function(sequelize, DataTypes) {
    const Applied = sequelize.define("Applied", {

        chosen:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        }
    },
    {
        timestamps: false
        
        // job_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references:{
        //         model: Job,
        //         key: id,
        //     }
        // },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references:{
        //         model: User,
        //         key: id,
        //     }
        // }
    });

    return Applied;
};