function applyAssociation(sequelize) {
	const { Applied,Company,Job,Labourer,User } = sequelize.models;

	User.hasOne(Company);
    Company.belongsTo(User);

    User.hasOne(Labourer);
    Labourer.belongsTo(User);

    Company.hasMany(Job);
    Job.belongsTo(Company);

    Job.hasMany(Applied);
    Applied.belongsTo(Job);
    User.hasMany(Applied);
    Applied.belongsTo(User);
}

module.exports = {applyAssociation};