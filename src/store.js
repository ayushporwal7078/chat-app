import {configureStore} from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import appApi from './services/appApi';

//persists our store
import {combineReducers} from 'redux' 
import storage from 'reduxjs-toolkit-persist/lib/storage';
//import { persistCombineReducers } from 'reduxjs-toolkit-persist';
import {persistReducer} from 'reduxjs-toolkit-persist'

import thunk from 'redux-thunk';

const reducer = combineReducers({
    user: userSlice,
    [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
    key : 'root',
    storage,
    blackList : [appApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware :  [thunk, appApi.middleware],
})

export default store;
