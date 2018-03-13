import { Review } from './review';

export type Room = {
  id: number;
  description: string;
  latitude: string;
  longitude: string;
  location: string;
  createDate: string;
  reviews: Review[];
  averageRating?: number;
};
