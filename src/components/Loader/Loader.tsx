import React from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import styles from './Loader.module.scss'

type Props = {
  fullPage?: boolean,
}

const Loader = (props: Props) => {
  const {fullPage} = props
  const containerClassNames = classname(
    styles.spinner,
    fullPage && styles.fullPage,
  )

  return (
    <div className={containerClassNames}>
      <Circle/>
      <Circle/>
      <Circle/>
      <Circle/>
      <Circle/>
    </div>
  )
}

const Circle = () => {
  return (
    <div className={styles.circle}/>
  )
}

Loader.propTypes = {
  /**
   * Defines whether the spinner should be full page or not.
   */
  fullPage: PropTypes.bool,
}

export default Loader
