import { createReducer } from '@reduxjs/toolkit';

import { saveUsers } from './actions';

const initialState = { list: [] };

export const users = createReducer(initialState, (builder) => {
  builder
    .addCase(saveUsers, (state, action) => {
      state.list = action.payload;
    })
});
