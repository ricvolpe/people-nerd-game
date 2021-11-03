import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const friendsSlice = createSlice({
  name: 'friendsIds',
  initialState,
  reducers: {
    setIds: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setIds } = friendsSlice.actions

export default friendsSlice.reducer