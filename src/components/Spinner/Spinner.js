import React from 'react'
import PropTypes from 'prop-types'
import classname from 'classnames'
import styles from './Spinner.module.scss'

const Spinner = props => {
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

Spinner.propTypes = {
  /**
   * Defines whether the spinner should be full page or not.
   */
  fullPage: PropTypes.bool,
}

export default Spinner
