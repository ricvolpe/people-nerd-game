import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    increaseScore: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increaseScore } = scoreSlice.actions

export default scoreSlice.reducer