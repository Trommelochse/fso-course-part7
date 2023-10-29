import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeBlogs, sortByLikesAction } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const sortByLikes = () => {
    dispatch(sortByLikesAction(blogs))
  }

  return (
    <>
      <h2>blogs</h2>
      <div>
        <button onClick={sortByLikes}>Sort by Likes</button>
      </div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )
      })}
    </>
  )
}

export default BlogList
