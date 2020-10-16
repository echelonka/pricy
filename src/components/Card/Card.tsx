import React from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import styles from './Card.module.scss'

type NewProps = {
  children: React.ReactNode,
  className?: string,
}

type Props = NewProps & Omit<React.ComponentProps<'div'>, keyof NewProps>

const Card = (props: Props) => {
  const {children, className, ...attrs} = props
  const classNames = classname(
    className,
    styles.card,
  )

  return (
    <div {...attrs} className={classNames}>{children}</div>
  )
}

Card.propTypes = {
  /**
   * The card custom class name.
   */
  className: PropTypes.string,
}

export default Card
