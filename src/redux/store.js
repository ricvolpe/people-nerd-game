import { configureStore } from '@reduxjs/toolkit'
import answerSlice from './answerSlice'
import answerOptionsSlice from './answerOptionsSlice'
import friendsSlice from './friendsSlice'
import scoreSlice from './scoreSlice'
import tweetAuthorSlice from './tweetAuthorSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    answer: answerSlice,
    answerUserIDs: answerOptionsSlice,
    friendsIds: friendsSlice,
    score: scoreSlice,
    tweetAuthor: tweetAuthorSlice,
    userName: userReducer,    
  },
})