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
    <>
      <h2>Log in to Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input {...usernameField} />
        </div>
        <div>
          <label>Password</label>
          <input {...passwordField} />
        </div>
        <input type="submit" className="primary" value="Login" />
      </form>
    </>
  )
}

export default LoginForm
