import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { appReducer } from './reducers';

const finalCreateStore = composeWithDevTools(applyMiddleware(thunk))(
  createStore
);

const persistConfig = {
  key: 'root',
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const createAndPersistStore = () => {
  const store = finalCreateStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
};
