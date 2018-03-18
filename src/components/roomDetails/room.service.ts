import { get, post, httpDelete } from '@shared/baseService';
import { Room, Review } from '@models';
import { AddReviewFormModel } from './addReviewForm';

export function addRoom(addRoomReq): Promise<any> {
  return post<any>('/api/restrooms/add', addRoomReq);
}

export function deleteReview(id): Promise<{ success: boolean }> {
  return httpDelete<any>(`/api/reviews/${id}`);
}

export function getRoom(id): Promise<Room> {
  return get<Room>(`/api/restrooms/${id}`);
}

export type SubmitReviewRequest = {
  review: Partial<Review>;
  recaptchaResponse: string;
};

export type SubmitReviewResponse = {
  success: boolean;
  error?: string;
  review?: Review;
};

export function addReview(
  review: SubmitReviewRequest
): Promise<SubmitReviewResponse> {
  return post<SubmitReviewResponse>('/api/reviews/add', review);
}
