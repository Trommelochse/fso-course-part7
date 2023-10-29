import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const localStorageUser = window.localStorage.getItem('loggedInUser')

const initialState = localStorageUser ? {
  authenticated: true,
  user: JSON.parse(localStorageUser),
  error: null
} : {
  authenticated: false,
  user: null,
  error: null
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    authSuccess(state, action) {
      return {
        authenticated: true,
        user: action.payload,
        error: null
      }
    },
    authError(state, action) {
      return {
        authenticated: false,
        user: null,
        error: action.payload
      }
    },
    logout(state, action) {
      return {
        authenticated: false,
        user: null,
        error: null
      }
    }
  },
})

export const { authSuccess, authError, logout } = loginSlice.actions


export const loginAction = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(authSuccess(user))
    } catch (error) {
      dispatch(authError(error.response.data.error))
    }
  }
}

export const logoutAction = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(logout())
  }
}

export default loginSlice.reducer