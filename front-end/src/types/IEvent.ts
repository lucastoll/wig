import type ICategory from "@/types/ICategory";
import type ILocation from "@/types/ILocation";

export default interface IEvent {
  id: number;
  imageMobile: string;
  imageDesktop: string;
  initialDate: string;
  finalDate: string;
  finalPrice: number;
  name: string;
  Categories: ICategory[];
  Location: ILocation;
}
