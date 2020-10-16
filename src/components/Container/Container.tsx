import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Container.module.scss'

type NewProps = {
  children: React.ReactNode,
  className?: string,
}

type Props = NewProps & Omit<React.ComponentProps<'div'>, keyof NewProps>

const Container = (props: Props) => {
  const {children, className, ...attrs} = props
  const classNames = classnames(
    className,
    styles.Container
  )

  return <div {...attrs} className={classNames}>{children}</div>
}

Container.propTypes = {
  className: PropTypes.string,
}

export default Container
