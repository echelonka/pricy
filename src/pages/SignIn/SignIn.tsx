import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Trans, useTranslation} from 'react-i18next'
import {FirebaseContext} from 'context/Firebase'
import Container from 'components/Container'
import Card from 'components/Card'
import FormInput from 'components/FormInput'
import Button from 'components/Button'
import {ROUTE_CONF} from 'routes'
import usePathLocalization from 'hooks/usePathLocalization'

const initialValues = {
  email: '',
  password: '',
}

const SignIn: React.FC = () => {
  const {t} = useTranslation()

  return (
    <Container>
      <Card className={'mt-4 mb-4 ml-auto mr-auto'} style={{maxWidth: '500px'}}>
        <h2>{t('signIn')}</h2>
        <SignInForm/>
      </Card>
      <SignUpLink/>
    </Container>
  )
}

const SignInForm: React.FC = () => {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()
  const [values, setValues] = useState(initialValues)
  const [error, setError] = useState<Error | null>(null)
  const [isDisabled, setDisabled] = useState(true)
  const {t} = useTranslation()
  const dashboardPath = usePathLocalization(ROUTE_CONF.DASHBOARD)

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
      setDisabled(true)
      const {email, password} = values
      await firebase!.signInWithEmailAndPassword(email, password)
      history.push(dashboardPath)
    } catch (e) {
      setError(e)
    } finally {
      setDisabled(false)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormInput
        className={'mb-2'}
        onChange={handleInputChange}
        placeholder={t('emailAddress')}
        name={'email'}
        type={'email'}
        value={values.email}
      />
      <FormInput
        className={'mb-2'}
        onChange={handleInputChange}
        placeholder={t('password')}
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
        {t('signIn')}
      </Button>
    </form>
  )
}

const SignUpLink = () => {
  const signUpPath = usePathLocalization(ROUTE_CONF.SIGN_UP)

  return (
    <p className={'text-center'}>
      <Trans i18nKey={'accountNotExist'}>
        Don't have an account yet? <Link className={'text-primary'} to={signUpPath}>Sign up</Link>
      </Trans>
    </p>
  )
}

export default SignIn
