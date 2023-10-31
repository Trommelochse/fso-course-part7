import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../reducers/authReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logoutAction())
  }

  return (
    <nav className="flex flex-row justify-between bg-gray-600 shadow mb-4 py-2 px-4 lg:py-4 lg:px-8 ">
      {user ? (
        <>
          <div className="flex flex-row space-x-8 items-center">
            <Link
              to="/"
              className="text-white text-lg font-medium hover:underline"
            >
              📚 Blogs
            </Link>
            <Link
              to="/users"
              className="text-white text-lg font-medium hover:underline"
            >
              🧑 Users
            </Link>
          </div>
          <div className="flex flex-row space-x-4 items-center">
            <p className="text-white italic text-sm">
              Logged in as {user.username}
            </p>
            <button className="btn-secondary" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </>
      ) : (
        <div className="text-right flex-grow">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navigation
