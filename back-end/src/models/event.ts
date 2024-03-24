import { DataTypes, Model } from "sequelize";
import db from "../db";
import { User } from "./user";
import { City } from "./city";

class Event extends Model {
  public name!: string;
  public image!: string;
  public organizer!: User;
  public date!: Date;
  public price!: number;
  public address!: string;
  public minAge!: number;
  public description!: string;
  public instagramEmbed!: string;
  public city!: City;
}

Event.init(
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instagramEmbed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Event",
  }
);

export { Event };
