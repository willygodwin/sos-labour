module.exports = function(sequelize, DataTypes) {
    const Job = sequelize.define("Job", {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address:{
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: true,
        },
        site_manager: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
        start_date:{
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        end_date:{
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        number_of_labourers:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        job_status:{
            type: DataTypes.STRING(6),
            allowNull: false,
            defaultValue: 'open'
        }
        // company_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references:{
        //         model: Company,
        //         key: id,
        //     }
        // }
    },{
        timestamps: false
    });

    return Job;
};