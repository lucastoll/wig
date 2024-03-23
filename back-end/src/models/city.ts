import { DataTypes, Model } from "sequelize";
import db from "../db";

class City extends Model {
  public id!: string;
  public name!: string;
}

City.init(
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
  },
  {
    sequelize: db,
    modelName: "City",
  }
);

export { City };
