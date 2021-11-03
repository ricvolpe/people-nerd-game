import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'
import friendsSlice from './friendsSlice'

export const store = configureStore({
  reducer: {
    playerName: playerReducer,
    friendsIds: friendsSlice,
  },
})