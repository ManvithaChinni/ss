const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "player"),
      allowNull: false,
      defaultValue: "player",
    },
  });

  // Hook to hash password before saving
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  // Define associations
  User.associate = (models) => {
    User.belongsToMany(models.Event, {
      through: "UserEvent", // Association table
      foreignKey: "userId",
      otherKey: "eventId",
    });
  };

  return User;
};
