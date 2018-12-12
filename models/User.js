module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    openid: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    timestamps: false
  });
}