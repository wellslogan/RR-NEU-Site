import { get } from '@shared/baseService';
import { Review } from '@models';

export const getCurrentUserReviews = (): Promise<Review[]> => {
  return get<Review[]>('/api/users/getCurrentUserReviews');
};
