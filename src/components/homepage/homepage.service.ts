import { get } from '@shared/baseService';
import { Room } from '@models';

export function getHomepageRooms(): Promise<Room[]> {
  return get<Room[]>('/api/restrooms');
}
