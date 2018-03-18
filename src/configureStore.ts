import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { globalReducer } from '@shared/globalRedux/global.reducers';
import { searchReducer } from '@app/components/search/search.reducers';
import { roomDetailsReducer } from '@app/components/roomDetails/roomDetails.reducers';
import { profileReducer } from '@app/components/profile/profile.reducer';
import { HomepageReducer } from '@app/components/homepage/homepage.reducer';
import { addRoomReducer } from '@app/components/addRestroom/addRoom.reducer';

const finalCreateStore = composeWithDevTools(applyMiddleware(thunk))(
  createStore
);

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const combinedReducers = combineReducers({
  global: globalReducer,
  search: searchReducer,
  roomDetails: roomDetailsReducer,
  profile: profileReducer,
  homepage: HomepageReducer,
  addRoom: addRoomReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const createAndPersistStore = () => {
  const store = finalCreateStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
