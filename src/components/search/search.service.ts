import { get } from '@shared/baseService';
import { Room } from '@models';

export const getSearchResults = (query: string): Promise<Room[]> => {
  return get<Room[]>('/api/restrooms/search?q=' + query);
};
