import { BelongsToManyAddAssociationsMixin, DataTypes, Model } from "sequelize";
import db from "../db";
import { User } from "./User";
import { Location } from "./Location";
import { Category } from "./Category";

interface EventInstance extends Model {
  addCategories: BelongsToManyAddAssociationsMixin<Category, number>;
}

class Event extends Model implements EventInstance {
  public name!: string;
  public imageMobile!: string;
  public imageDesktop!: string;
  public organizer!: User;
  public initialDate!: Date;
  public finalDate!: Date;
  public initialPrice!: number;
  public finalPrice!: number;
  public minAge!: number;
  public description!: string;
  public instagramEmbed!: string;
  public location!: Location;

  public addCategories!: BelongsToManyAddAssociationsMixin<Category, number>;
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
    imageMobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageDesktop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initialDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finalDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    initialPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    finalPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
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
