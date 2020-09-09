import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Button.module.scss'

const Button = props => {
  const {block, className, children, color, ...attrs} = props
  const classNames = classnames(
    className,
    styles.button,
    block && styles.block,
    color && styles[color]
  )

  return (
    <button {...attrs} className={classNames}>{children}</button>
  )
}

Button.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'error',
    'warning',
    'light',
    'dark'
  ])
}

export default Button
