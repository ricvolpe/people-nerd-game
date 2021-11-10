import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const tweetAuthorSlice = createSlice({
  name: 'tweetAuthorID',
  initialState,
  reducers: {
    setTweetAuthorID: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setTweetAuthorID } = tweetAuthorSlice.actions

export default tweetAuthorSlice.reducer