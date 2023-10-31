import { Routes, Route, useNavigate, useMatch } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import { authSuccess, logoutAction } from './reducers/authReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const blogFormRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const { user } = auth

  useEffect(() => {
    if (auth.authenticated) {
      blogService.setToken(auth.user.token)
    }
  }, [auth, dispatch])

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogForm = () => (
    <Togglable buttonLabel="Create new Blog" ref={blogFormRef}>
      <BlogForm toggleRef={blogFormRef} />
    </Togglable>
  )

  const userMatch = useMatch('/users/:id')
  const userToShow = userMatch
    ? users?.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogToShow = blogMatch
    ? blogs?.find((user) => user.id === blogMatch.params.id)
    : null

  return (
    <div className="flex flex-col items-center bg-white min-h-screen">
      <div className="container margin-0-auto bg-gray-50">
        <Navigation />
        <div className="lg:py-4 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {blogForm()}
                  <BlogList />
                </>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User user={userToShow} />} />
            <Route path="/blogs/:id" element={<BlogPost blog={blogToShow} />} />
          </Routes>
        </div>
        <Notification />
      </div>
    </div>
  )
}

export default App
