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
    resetScore: (state) => {
      state.value = 0
    },
  },
})

export const { increaseScore, resetScore } = scoreSlice.actions

export default scoreSlice.reducer