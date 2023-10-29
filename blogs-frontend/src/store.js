import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'


export default configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    blogs: blogReducer,
    users: userReducer,
  },
})