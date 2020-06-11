import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';

import cartReducer from './Card';
import {userReducer} from "./user"

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  whitelist: ["user"]
};

const rootReducer = combineReducers({

  cart: cartReducer,
  user:userReducer
});

export default persistReducer(persistConfig, rootReducer);