import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateLikesAction, deleteBlogAction } from '../reducers/blogReducer'
import blogService from '../services/blogs'

import Comments from './Comments'

const BlogPost = ({ blog }) => {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) return null

  const blogUserId = typeof blog.user === 'string' ? blog.user : blog.user.id

  const handleLike = () => {
    dispatch(updateLikesAction(blog))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.setToken(user.token)
      dispatch(deleteBlogAction(blog))
      navigate('/')
    }
  }

  return (
    <div className="py-4 px-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl mb-2">{blog.title}</h2>
      <p className="text-gray-400 font-italic">by {blog.author}</p>
      <p className="mb-4">
        Read more here:{' '}
        <a href={blog.url} className="text-blue-500 underline">
          {blog.url}
        </a>
      </p>
      <p className="flex flex-row space-x-4 mb-4">
        <span>{blog.likes} likes</span>
        <button onClick={handleLike} className="btn-primary btn-sm">
          Like
        </button>
      </p>
      <div className="flex flex-row justify-end">
        {blogUserId === user.id ? (
          <button onClick={handleDelete} className="btn-danger btn-sm">
            Delete
          </button>
        ) : null}
      </div>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogPost
