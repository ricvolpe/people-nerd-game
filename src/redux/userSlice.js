import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
}

export const userSlice = createSlice({
  name: 'userName',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setName } = userSlice.actions

export default userSlice.reducer