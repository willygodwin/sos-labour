module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      // The email cannot be null, and must be a proper email before creation
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_type:{
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(35),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      // The password cannot be null
      password: {
        type: DataTypes.STRING(16),
        allowNull: false
      }
    },{
      timestamps: false
    });

    return User;
};