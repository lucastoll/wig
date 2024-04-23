import type ICategory from "@/types/ICategory";
import type ILocation from "@/types/ILocation";

export default interface IEvent {
  id: number;
  imageMobile: string;
  imageDesktop: string;
  initialDate: string;
  finalDate: string;
  finalPrice: number;
  description: string;
  initialPrice: number;
  startTime: number;
  endTime: number;
  name: string;
  Categories: ICategory[];
  Location: ILocation;
  instagramEmbed: string;
  minAge: number;
}
