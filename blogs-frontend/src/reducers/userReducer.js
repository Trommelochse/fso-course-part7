import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async dispatch => {
    const response = await axios.get('/api/users')
    dispatch(setUsers(response.data))
  }
}

export const { setUsers } = userSlice.actions
export default userSlice.reducer