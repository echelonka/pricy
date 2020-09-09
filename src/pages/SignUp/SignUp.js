import React, {useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {withFirebase} from 'context/withFirebase'
import Container from 'components/Container'
import FormInput from 'components/FormInput'
import Button from 'components/Button'
import Card from 'components/Card'

const SignUp = () => {
  return (
    <Container>
      <Card className={'mt-4 mb-4 ml-auto mr-auto'} style={{maxWidth: '500px'}}>
        <h2>Sign Up</h2>
        <SignUpForm/>
      </Card>
      <SignInLink/>
    </Container>
  )
}

const SignUpFormBase = props => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isDisabled, setDisabled] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setDisabled(password !== confirmPassword || !password || !email || !username)
  }, [username, email, password, confirmPassword])

  const onSubmit = async event => {
    event.preventDefault()
    try {
      await props.firebase.createUserWithEmailAndPassword(email, password)
      props.history.push('/dashboard')
    } catch (e) {
      setError(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormInput
        className={'mb-2'}
        onChange={event => setUsername(event.target.value)}
        placeholder={'Full Name'}
        type={'text'}
        value={username}
      />
      <FormInput
        className={'mb-2'}
        onChange={event => setEmail(event.target.value)}
        placeholder={'Email Address'}
        type={'text'}
        value={email}
      />
      <FormInput
        className={'mb-2'}
        onChange={event => setPassword(event.target.value)}
        placeholder={'Password'}
        type={'password'}
        value={password}
      />
      <FormInput
        className={'mb-2'}
        onChange={event => setConfirmPassword(event.target.value)}
        placeholder={'Confirm Password'}
        type={'password'}
        value={confirmPassword}
      />
      {error && <p className={'text-error'}>{error.message}</p>}
      <Button
        block
        disabled={isDisabled}
        type={'submit'}
        color={'success'}
      >Sign Up</Button>
    </form>
  )
}

const SignUpForm = withRouter(withFirebase(SignUpFormBase))

const SignInLink = () => {
  return (
    <p className={'text-center'}>
      Already have an account? <Link className={'text-primary'} to={'/sign-in'}>Sign in</Link>
    </p>
  )
}

export default SignUp
