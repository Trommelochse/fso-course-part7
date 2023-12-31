import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div>{visible ? props.children : null}</div>
      <div>
        <button
          className={visible ? 'btn-danger ' : 'btn-primary'}
          onClick={toggleVisibility}
        >
          {visible ? 'Cancel' : props.buttonLabel}
        </button>
      </div>
      <hr className="my-4" />
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
