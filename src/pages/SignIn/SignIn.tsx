import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react'
import {Link, RouteComponentProps, withRouter} from 'react-router-dom'
import {FirebaseContext} from 'context/Firebase'
import Container from 'components/Container'
import Card from 'components/Card'
import FormInput from 'components/FormInput'
import Button from 'components/Button'
import {ROUTE_CONF} from 'routes'

const initialValues = {
  email: '',
  password: '',
}

const SignIn: React.FC = () => {
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

const SignInFormBase: React.FC<RouteComponentProps> = props => {
  const firebase = useContext(FirebaseContext)
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState<Error | null>(null)
  const [isDisabled, setDisabled] = useState(true)

  useEffect(() => {
    const {email, password} = values
    setDisabled(!email || !password)
  }, [values])

  const handleInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => ({...prevValues, [name]: value}))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const {email, password} = values
      await firebase?.signInWithEmailAndPassword(email, password)
      props.history.push(ROUTE_CONF.DASHBOARD)
    } catch (e) {
      setError(e)
    }
  }

  return (
    <form onSubmit={onSubmit}>
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
      {error && <p className={'text-error'}>{error.message}</p>}
      <Button
        block
        disabled={isDisabled}
        type={'submit'}
        className={'mt-4'}
        color={'success'}
      >
        Sign In
      </Button>
    </form>
  )
}

const SignInForm = withRouter(SignInFormBase)

const SignUpLink = () => {
  return (
    <p className={'text-center'}>
      Don't have an account yet? <Link className={'text-primary'} to={'/sign-up'}>Sign up</Link>
    </p>
  )
}

export default SignIn
