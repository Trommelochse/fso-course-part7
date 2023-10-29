import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateLikesAction, deleteBlogAction } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const BlogPost = ({ blog }) => {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!blog) return null

  const blogUserId = blog && blog.user === 'string' ? blog.user : blog.user.id

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
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes <button onClick={handleLike}>Like</button>
      </p>
      {blogUserId === user.id ? (
        <button onClick={handleDelete}>Delete</button>
      ) : null}
    </div>
  )
}

export default BlogPost
