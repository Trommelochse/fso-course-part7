import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { notify } from '../reducers/notificationReducer'
import { createBlogAction } from '../reducers/blogReducer'
import { useSelector } from 'react-redux'
import blogService from '../services/blogs'

const BlogForm = ({ toggleRef }) => {
  const user = useSelector((state) => state.auth.user)
  const [titleField, resetTitleField] = useField('text')
  const [authorField, resetAuthorField] = useField('text')
  const [urlField, resetUrlField] = useField('text')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    const newBlog = {
      title: titleField.value,
      author: authorField.value,
      url: urlField.value,
      user: user.id,
    }
    blogService.setToken(user.token)
    dispatch(createBlogAction(newBlog))
    resetTitleField()
    resetAuthorField()
    resetUrlField()
    navigate('/')
    dispatch(
      notify(
        `A new blog ${titleField.value} by ${authorField.value} added`,
        'success',
        3,
      ),
    )
    toggleRef.current.toggleVisibility()
  }

  return (
    <>
      <h3 className="text-lg font-bold mb-4">You are submitting a new Blog</h3>
      <form onSubmit={handleBlogSubmit} className="mb-2">
        <div>
          <label>Title</label>
          <input {...titleField} />
        </div>
        <div>
          <label>Author</label>
          <input {...authorField} />
        </div>
        <div>
          <label>URL</label>
          <input {...urlField} className="mb-2" />
        </div>
        <input type="submit" className="btn-primary" />
      </form>
    </>
  )
}

export default BlogForm
