import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const answerOptionsSlice = createSlice({
  name: 'answerUserIDs',
  initialState,
  reducers: {
    setAnswerIDs: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setAnswerIDs } = answerOptionsSlice.actions

export default answerOptionsSlice.reducer