import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

  const handleLogout = () => {
    dispatch(logoutAction())
    navigate('/login')
  }

  const userInfo = () => {
    return (
      <div>
        <p>
          Logged in as <strong>{user.username}</strong>
        </p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel="Create new Blog" ref={blogFormRef}>
      <BlogForm user={user} />
    </Togglable>
  )

  const appStyle = {
    width: 960,
    margin: '0 auto',
    backgroundColor: '#ffffff',
  }

  const userMatch = useMatch('/users/:id')
  const userToShow = userMatch
    ? users?.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogToShow = blogMatch
    ? blogs?.find((user) => user.id === blogMatch.params.id)
    : null

  return (
    <div style={appStyle}>
      <nav>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        {user && userInfo()}
      </nav>
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
      <Notification />
    </div>
  )
}

export default App
