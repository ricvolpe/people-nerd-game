import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const playerSlice = createSlice({
  name: 'playerName',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setName } = playerSlice.actions

export default playerSlice.reducer