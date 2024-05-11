import { DataTypes, Model } from "sequelize";
import db from "../db";

class SustainabilityQuestion extends Model {
  public id!: number;
  public question!: string;
  public answer!: string;
}

SustainabilityQuestion.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "SustainabilityQuestion",
  }
);

export { SustainabilityQuestion };