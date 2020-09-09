import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './FormInput.module.scss'

const FormInput = props => {
  const {className, onChange, success, error, ...attrs} = props
  const classNames = classnames(
    className,
    styles.input,
  )

  return <input {...attrs} onChange={onChange} className={classNames} />
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
