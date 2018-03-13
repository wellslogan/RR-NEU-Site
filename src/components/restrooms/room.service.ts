import { get, post } from '@shared/baseService';

export function addRoom(addRoomReq): Promise<any> {
  return post<any>('/api/restrooms/add', addRoomReq);
}
