import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../db";

class User extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
}

class Order extends Model {
  public id!: number;
  public descricao!: string;
}

// Define os modelos
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Order",
  }
);

User.belongsToMany(Order, { through: "ClientOrder" });
Order.belongsToMany(User, { through: "ClientOrder" });

export { User, Order };
