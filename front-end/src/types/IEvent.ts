import type ICategory from "@/types/ICategory";
import type ILocation from "@/types/ILocation";

export default interface IEvent {
  imageMobile: string;
  imageDesktop: string;
  initialDate: string;
  finalDate: string;
  name: string;
  Categories: ICategory[];
  Location: ILocation;
}
