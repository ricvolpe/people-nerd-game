import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'

export const store = configureStore({
  reducer: {
    playerName: playerReducer
  },
})