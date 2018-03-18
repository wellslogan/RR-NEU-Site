import { post } from '@shared/baseService';
import { Room } from '@models';

export type AddRoomRequest = {
  restroom: Partial<Room>;
  recaptchaResponse: string;
};

export type AddRoomResponse = {
  success: boolean;
};

export function addRoom(addRoomRequest: AddRoomRequest) {
  return post<AddRoomResponse>('/api/restrooms/add', addRoomRequest);
}
