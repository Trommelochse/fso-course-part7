import { v4 as uuidv4 } from 'uuid'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { addCommentAction } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()
  const [commentField, resetCommentField] = useField('text')

  if (!blog) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addCommentAction(blog.id, commentField.value))
    resetCommentField()
  }

  return (
    <div>
      <hr className="my-4" />
      <h3 className="text-xl mb-2">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <label>New Comment</label>
        <input {...commentField} className="mb-2" />
        <button type="submit" className="btn-secondary btn-sm">
          Add
        </button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={uuidv4()} className="list-disc ml-4">
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
