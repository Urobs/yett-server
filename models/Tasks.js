module.exports = (sequelize, DataTypes) => {
  return sequelize.define("tasks", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.ENUM('1', '2', '3', '4'),
      allowNull: false
    },
    expireTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isFinished: {
      type: DataTypes.ENUM('yes', 'no'),
      allowNull: false,
      defaultValue: 'no'
    },
    isExpired: {
      type: DataTypes.ENUM('yes', 'no'),
      allowNull: false,
      defaultValue: 'no'
    }
  }, {
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: false,
  });
}