import React, {useContext, useEffect, useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FirebaseContext} from 'context/Firebase'
import Container from 'components/Container'
import FormInput from 'components/FormInput'
import Button from 'components/Button'
import Card from 'components/Card'

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

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
  const firebase = useContext(FirebaseContext)
  const [values, setValues] = useState(initialValues)
  const [isDisabled, setDisabled] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const {username, email, password, confirmPassword} = values
    setDisabled(password !== confirmPassword || !password || !email || !username)
  }, [values])

  const handleInputChange = ({target: {name, value}}) => {
    setValues(prevValues => ({...prevValues, [name]: value}))
  }

  const onSubmit = async event => {
    event.preventDefault()
    try {
      const {email, password} = values
      await firebase.createUserWithEmailAndPassword(email, password)
      props.history.push('/dashboard')
    } catch (e) {
      setError(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormInput
        className={'mb-2'}
        onChange={handleInputChange}
        placeholder={'Full Name'}
        name={'username'}
        type={'text'}
        value={values.username}
      />
      <FormInput
        className={'mb-2'}
        onChange={handleInputChange}
        placeholder={'Email Address'}
        name={'email'}
        type={'text'}
        value={values.email}
      />
      <FormInput
        className={'mb-2'}
        onChange={handleInputChange}
        placeholder={'Password'}
        name={'password'}
        type={'password'}
        value={values.password}
      />
      <FormInput
        className={'mb-2'}
        onChange={handleInputChange}
        placeholder={'Confirm Password'}
        name={'confirmPassword'}
        type={'password'}
        value={values.confirmPassword}
      />
      {error && <p className={'text-error'}>{error.message}</p>}
      <Button
        block
        className={'mt-4'}
        disabled={isDisabled}
        type={'submit'}
        color={'success'}
      >Sign Up</Button>
    </form>
  )
}

const SignUpForm = withRouter(SignUpFormBase)

const SignInLink = () => {
  return (
    <p className={'text-center'}>
      Already have an account? <Link className={'text-primary'} to={'/sign-in'}>Sign in</Link>
    </p>
  )
}

export default SignUp