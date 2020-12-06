import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './ButtonGroup.module.scss'

type NewProps = {
  className?: string,
  children: JSX.Element[] | JSX.Element,
}

type Props = NewProps

const ButtonGroup = (props: Props) => {
  const {className, children} = props
  const classNames = classnames(
    className,
    styles.group,
  )

  return (
    <div className={classNames}>
      {children}
    </div>
  )
}

ButtonGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default ButtonGroup
