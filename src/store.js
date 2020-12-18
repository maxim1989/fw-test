import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { users } from './__data__/reducers';

export default function configureAppStore() {
    const store = configureStore({
        reducer: combineReducers({ users })
    });

    return store;
}