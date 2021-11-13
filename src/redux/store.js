import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import friendsSlice from './friendsSlice'
import tweetAuthorSlice from './tweetAuthorSlice'
import answerOptionsSlice from './answerOptionsSlice'
import scoreSlice from './scoreSlice'

export const store = configureStore({
  reducer: {
    userName: userReducer,
    friendsIds: friendsSlice,
    tweetAuthor: tweetAuthorSlice,
    answerUserIDs: answerOptionsSlice,
    score: scoreSlice,
  },
})