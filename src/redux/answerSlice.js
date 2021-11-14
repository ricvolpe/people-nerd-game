import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    giveAnswer: (state, action) => {
      state.value = action.payload
    },
    resetAnswer: (state) => {
      state.value = null
    },
  },
})

export const { giveAnswer, resetAnswer } = answerSlice.actions

export default answerSlice.reducer