import { useField } from '../hooks/'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { loginAction } from '../reducers/authReducer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const LoginForm = () => {
  const auth = useSelector((state) => state.auth)
  const { user } = auth
  const [usernameField, usernameReset] = useField('text')
  const [passwordField, passwordReset] = useField('password')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    if (auth.error) {
      console.log(auth.error)
      dispatch(notify(auth.error, 'error', 5))
    }
  }, [auth, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const username = usernameField.value
    const password = passwordField.value
    dispatch(loginAction({ username, password }))
    usernameReset()
    passwordReset()
  }

  return (
    <div className="flex flex-row justify-center">
      <div>
        <h3 className="text-2xl mb-4">Log in to Application</h3>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-2">
            <label>Username</label>
            <input {...usernameField} />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input {...passwordField} />
          </div>
          <input type="submit" className="btn-primary" value="Login" />
        </form>
      </div>
    </div>
  )
}

export default LoginForm
