import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import friendsSlice from './friendsSlice'

export const store = configureStore({
  reducer: {
    userName: userReducer,
    friendsIds: friendsSlice,
  },
})