import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <h3 className="text-lg mb-2">Added blogs</h3>
      <ul className="list-disc ml-3">
        {user.blogs?.map((blog) => (
          <li key={blog.id} className="mb-2 underline hover:text-blue-500">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
