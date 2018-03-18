import { GlobalState } from '../globalRedux/global.reducers';
import { SearchState } from '@app/components/search/search.reducers';
import { RoomDetailsState } from '@app/components/roomDetails/roomDetails.reducers';
import { ProfileState } from '@app/components/profile/profile.reducer';
import { HomepageState } from '@app/components/homepage/homepage.reducer';
import { AddRoomState } from '@app/components/addRestroom/addRoom.reducer';

export type AppState = {
  global: GlobalState;
  search: SearchState;
  roomDetails: RoomDetailsState;
  profile: ProfileState;
  homepage: HomepageState;
  addRoom: AddRoomState;
};
