import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Container.module.scss'

const Container = props => {
  const {children, className, ...attrs} = props
  const classNames = classnames(
    className,
    styles.Container
  )

  return <div {...attrs} className={classNames}>{children}</div>
}

Container.propTypes = {
  className: PropTypes.string
}

export default Container
