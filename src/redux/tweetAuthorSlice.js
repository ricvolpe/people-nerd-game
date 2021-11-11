import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const tweetAuthorSlice = createSlice({
  name: 'tweetAuthor',
  initialState,
  reducers: {
    setTweetAuthor: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setTweetAuthor } = tweetAuthorSlice.actions

export default tweetAuthorSlice.reducer