import { get, post, httpDelete } from '@shared/baseService';

export function addRoom(addRoomReq): Promise<any> {
  return post<any>('/api/restrooms/add', addRoomReq);
}

export function deleteReview(id): Promise<{ success: boolean }> {
  return httpDelete<any>(`/api/reviews/${id}`);
}
