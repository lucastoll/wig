import { DataTypes, Model } from "sequelize";
import db from "../db";

class Location extends Model {
  public id!: number;
  public address!: string;
  public zipcode!: number;
  public maxCapacity!: number;
  public coordlat!: number;
  public coordlon!: number;
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
    coordlat: {
      type: DataTypes.FLOAT, // Alterado para FLOAT para armazenar latitude
      allowNull: false,
    },
    coordlon: {
      type: DataTypes.FLOAT, // Alterado para FLOAT para armazenar longitude
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Location",
  }
);

export { Location };