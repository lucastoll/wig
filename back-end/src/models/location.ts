import { DataTypes, Model } from "sequelize";
import db from "../db";

class Location extends Model {
  public id!: string;
  public address!: string;
  public zipcode!: number;
  public maxCapacity!: number;
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Location",
  }
);

export { Location };