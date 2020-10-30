import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Button.module.scss'

type NewProps = {
  block?: boolean,
  className?: string,
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'light' | 'dark',
  children: React.ReactNode,
  small?: boolean,
}

type Props = NewProps & Omit<React.ComponentProps<'button'>, keyof NewProps>

const Button = (props: Props) => {
  const {block, className, children, color, small, ...attrs} = props
  const classNames = classnames(
    className,
    styles.button,
    block && styles.block,
    color && styles[color],
    small && styles.small,
  )

  return (
    <button {...attrs} className={classNames}>
      <div className={styles.inner}>
        {children}
      </div>
    </button>
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
    'dark',
  ]),
  small: PropTypes.bool,
}

export default React.memo(Button)
