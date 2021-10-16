import React from 'react'
import classnames from 'classnames'
import styles from './FormInput.module.scss'

type NewProps = {
  className?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

type Props = NewProps & Omit<React.ComponentProps<'input'>, keyof NewProps>

const FormInput = (props: Props) => {
  const {className, onChange, ...attrs} = props
  const containerClassNames = classnames(
    styles.container,
    className,
  )
  const inputClassNames = classnames(
    styles.input,
  )

  return (
    <div className={containerClassNames}>
      <input {...attrs} onChange={onChange} className={inputClassNames} />
    </div>
  )
}

export default FormInput
