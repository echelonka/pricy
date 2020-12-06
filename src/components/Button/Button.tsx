import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Button.module.scss'

type NewProps = {
  active?: boolean,
  block?: boolean,
  className?: string,
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'light' | 'dark',
  children: React.ReactNode,
  small?: boolean,
}

type Props = NewProps & Omit<React.ComponentProps<'button'>, keyof NewProps>

const Button = (props: Props) => {
  const {active, block, className, children, color, small, ...attrs} = props
  const classNames = classnames(
    className,
    styles.button,
    active && styles.active,
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
