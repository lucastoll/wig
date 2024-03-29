import { BelongsToManyAddAssociationsMixin, DataTypes, Model } from "sequelize";
import db from "../db";
import { Category } from "./Category";

interface UserInstance extends Model {
  addCategories: BelongsToManyAddAssociationsMixin<Category, number>;
}

class User extends Model implements UserInstance {
  public id!: number;
  public name!: string;
  public email!: string;
  public address!: string;
  public zipcode!: number;

  public addCategories!: BelongsToManyAddAssociationsMixin<Category, number>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

export { User };
