import { BelongsToManyAddAssociationsMixin, DataTypes, Model } from "sequelize";
import db from "../db";
import { User } from "./user";
import { Location } from "./location";
import { Category } from "./category";

interface EventInstance extends Model {
  addCategories: BelongsToManyAddAssociationsMixin<Category, number>;
}

class Event extends Model implements EventInstance {
  public id!: string;
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
  public Location!: Location;
  public Categories!: Category[];
  public startTime!: string;
  public endTime!: string;
  public ticketUrl!: string;
  public status!: "em análise" | "recusado" | "aprovado";
  public approvalFeedback!: string;

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
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    instagramEmbed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticketUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("em análise", "recusado", "aprovado"),
      allowNull: false,
      defaultValue: "em análise",
    },
    approvalFeedback: {
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
