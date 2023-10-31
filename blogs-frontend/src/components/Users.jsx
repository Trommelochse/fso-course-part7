import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="divide-y divide-gray-200">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>
                <Link
                  to={`/users/${user.id}`}
                  className="underline hover:text-blue-500"
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.username}</td>
              <td>{user.blogs?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
