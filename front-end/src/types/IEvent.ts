import type ICategory from "@/types/ICategory";
import type ILocation from "@/types/ILocation";

export interface IEvent {
  id?: number;
  organizerId?: string;
  name: string;
  imageMobile: string;
  imageDesktop: string;
  initialDate: Date;
  finalDate: Date;
  initialPrice: number;
  finalPrice: number;
  minAge: number;
  locationId?: number;
  address?: string;
  zipcode?: number;
  maxCapacity?: number;
  categoryIds?: number[];
  cityId: number;
  description: string;
  status?: string;
  organizer?: {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
  };
  approvalFeedback?: string;
  startTime: number;
  endTime: number;
  ticketUrl: string;
  Categories?: ICategory[];
  Location?: ILocation;
  instagramEmbed?: string;
  questions?: {
    question: string;
    answer?: string;
  }[];
}

export interface IEventWithSustainabilityQuestions extends IEvent {
  renewableEnergy?: string;
  wasteManagement?: string;
  visibleBins?: string;
  reduceWaste?: string;
  publicTransportation?: string;
  sustainableTransportIncentive?: string;
  socialEnvironmental?: string;
  monitorImpact?: string;
}
