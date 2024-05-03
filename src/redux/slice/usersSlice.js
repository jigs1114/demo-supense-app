import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
        state.push(action.payload);
    },
  },
})

// Action creators are generated for each case reducer function
export const { createUser } = usersSlice.actions

export default usersSlice.reducer