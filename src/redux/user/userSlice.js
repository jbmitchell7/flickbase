import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setLoginStatus } = userSlice.actions

export default userSlice.reducer