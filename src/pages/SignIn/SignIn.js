import React, {useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {withFirebase} from 'context/withFirebase'
import Container from 'components/Container'
import Card from 'components/Card'
import FormInput from 'components/FormInput'
import Button from 'components/Button'

const SignIn = () => {
  return (
    <Container>
      <Card className={'mt-4 mb-4 ml-auto mr-auto'} style={{maxWidth: '500px'}}>
        <h2>Sign In</h2>
        <SignInForm/>
      </Card>
      <SignUpLink/>
    </Container>
  )
}

const SignInFormBase = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isDisabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!email || !password)
  }, [email, password])

  const onSubmit = async event => {
    event.preventDefault()
    try {
      await props.firebase.signInWithEmailAndPassword(email, password)
      props.history.push('/dashboard')
    } catch (e) {
      setError(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
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
      {error && <p className={'text-error'}>{error.message}</p>}
      <Button
        block
        disabled={isDisabled}
        type={'submit'}
        color={'success'}
      >
        Sign In
      </Button>
    </form>
  )
}

const SignInForm = withRouter(withFirebase(SignInFormBase))

const SignUpLink = () => {
  return (
    <p className={'text-center'}>
      Don't have an account yet? <Link className={'text-primary'} to={'/sign-up'}>Sign up</Link>
    </p>
  )
}

export default SignIn
