import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'subfrom',
  user: 'Thannakrit'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      
      state.value = 'subfrom login'
      state.user = 'Hello Subfrom'
    },
    logout: (state) => {
      state.value = 'subfrom logout'
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions

export default userSlice.reducer