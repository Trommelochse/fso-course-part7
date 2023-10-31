import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sortByLikesAction } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  if (!blogs) {
    return null
  }

  const sortByLikes = () => {
    dispatch(sortByLikesAction(blogs))
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      <div className="mb-4">
        <button onClick={sortByLikes} className="btn-secondary btn-sm">
          Sort by Likes
        </button>
      </div>
      {blogs.map((blog) => {
        return (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div className="bg-white py-2 px-4 mb-2 shadow-sm rounded text-lg border hover:text-blue-500">
              <div className="flex flex-row justify-between space-x-2">
                <p>{blog.title}</p>
                <p className="text-xs text-gray-400">
                  {blog.likes} Likes - {blog.comments.length} comments{' '}
                </p>
              </div>
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default BlogList
