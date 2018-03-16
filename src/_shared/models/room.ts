import { Review, RestroomGender } from '@models';

export type Room = {
  id: number;
  description: string;
  latitude: string;
  longitude: string;
  location: string;
  createDate: string;
  reviews: Review[];
  averageRating?: number;
  restroomGender?: RestroomGender;
};
