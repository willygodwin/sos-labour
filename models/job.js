module.exports = function(sequelize, DataTypes) {
    const Job = sequelize.define("Job", {
        address:{
            type: DataTypes.STRING(40),
            allowNull: false,
            // unique: true,
        },
        suburb:{
            type: DataTypes.STRING(20),
            allowNull: false,
            // unique: true,
        },
        city:{
            type: DataTypes.STRING(20),
            allowNull: false,
            // unique: true,
        },
        state:{
            type: DataTypes.STRING(20),
            allowNull: false,
            // unique: true,
        },
        postcode:{
            type: DataTypes.STRING(8),
            allowNull: false,
            // unique: true,
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