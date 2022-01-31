import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Trans, useTranslation} from 'react-i18next'
import { AuthError } from 'firebase/auth'

import {useAuth} from 'context/AuthProvider'
import {ROUTE_CONF} from 'routes'
import usePathLocalization from 'hooks/usePathLocalization'

import Container from 'components/Container'
import Card from 'components/Card'
import FormInput from 'components/FormInput'
import Button from 'components/Button'

interface FormValues {
  email: string;
  password: string;
}

const getInitialValues = (): FormValues => ({
  email: '',
  password: '',
})

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
  const {signIn} = useAuth()
  const history = useHistory()
  const [values, setValues] = useState<FormValues>(getInitialValues())
  const [errorMessage, setErrorMessage] = useState<string>('')
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
      await signIn(email, password)
      history.push(dashboardPath)
    } catch (e) {
      const error = e as AuthError
      const message = error.message.replace(/Firebase:\s|\s\([^)]+\)./g, '')
      setErrorMessage(message)
    } finally {
      setDisabled(false)
    }
  }

  const bindFieldToForm = (fieldName: keyof FormValues) => {
    return {
      onChange: handleInputChange,
      name: fieldName,
      value: values[fieldName],
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormInput
        {...bindFieldToForm('email')}
        className={'mb-2'}
        placeholder={t('emailAddress')}
        type={'email'}
      />
      <FormInput
        {...bindFieldToForm('password')}
        className={'mb-2'}
        placeholder={t('password')}
        type={'password'}
      />
      {errorMessage && <p className={'text-error'}>{errorMessage}</p>}
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
