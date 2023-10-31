import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      return [...state, action.payload]
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload.id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { createBlog, updateBlog, deleteBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch(setBlogs(response.data))
  }
}

export const createBlogAction = (blog) => {
  return async dispatch => {
    const response = await blogService.create(blog)
    dispatch(createBlog(response.data))
  }
}

export const deleteBlogAction = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch(deleteBlog(blog))
  }
}

export const updateLikesAction = (blog) => {
  return async dispatch => {
    const response = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch(updateBlog(response.data))
  }
}

export const addCommentAction = (blogId, comment) => {
  return async dispatch => {
    const response = await blogService.createComment(blogId, comment)
    dispatch(updateBlog(response.data))
  }
}

export const sortByLikesAction = (blogs) => {
  return async dispatch => {
    if (!blogs) return
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedBlogs))
  }
}

export default blogSlice.reducer