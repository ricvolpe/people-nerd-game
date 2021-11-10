import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import friendsSlice from './friendsSlice'
import tweetAuthorSlice from './tweetAuthorSlice'
import answerOptionsSlice from './answerOptionsSlice'

export const store = configureStore({
  reducer: {
    userName: userReducer,
    friendsIds: friendsSlice,
    tweetAuthorID: tweetAuthorSlice,
    answerUserIDs: answerOptionsSlice
  },
})