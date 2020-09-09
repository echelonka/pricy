import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './FormInput.module.scss'

const FormInput = props => {
  const {className, onChange, ...attrs} = props
  const containerClassNames = classnames(
    styles.container,
    className,
  )
  const inputClassNames = classnames(
    styles.input,
  )

  return (
    <div className={containerClassNames}>
      <input {...attrs} onChange={onChange} className={inputClassNames} />
    </div>
  )
}

FormInput.propTypes = {
  /**
   * The input custom class name.
   */
  className: PropTypes.string,
  /**
   * The input value change callback.
   */
  onChange: PropTypes.func,
}

export default FormInput
