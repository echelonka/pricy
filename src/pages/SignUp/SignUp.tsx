import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Trans, useTranslation} from 'react-i18next'
import {AuthError} from 'firebase/auth'

import {FirebaseContext} from 'context/Firebase'
import {useAuth} from 'context/AuthProvider'
import Container from 'components/Container'
import FormInput from 'components/FormInput'
import Button from 'components/Button'
import Card from 'components/Card'
import {ROUTE_CONF} from 'routes'
import usePathLocalization from 'hooks/usePathLocalization'

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const getInitialValues = (): FormValues => ({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const SignUp = () => {
  const {t} = useTranslation()

  return (
    <Container>
      <Card className={'mt-4 mb-4 ml-auto mr-auto'} style={{maxWidth: '500px'}}>
        <h2>{t('signUp')}</h2>
        <SignUpForm/>
      </Card>
      <SignInLink/>
    </Container>
  )
}

const SignUpForm: React.FC = () => {
  const firebase = useContext(FirebaseContext)
  const {signUp} = useAuth()
  const history = useHistory()
  const [values, setValues] = useState<FormValues>(getInitialValues())
  const [isDisabled, setDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {t} = useTranslation()
  const dashboardPath = usePathLocalization(ROUTE_CONF.DASHBOARD)

  useEffect(() => {
    const {username, email, password, confirmPassword} = values
    setDisabled(password !== confirmPassword || !password || !email || !username)
  }, [values])

  const handleInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setValues(prevValues => ({...prevValues, [name]: value}))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setDisabled(true)
      const {username, email, password} = values
      await signUp(email, password)
      await firebase!.updateProfile({displayName: username})
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
        {...bindFieldToForm('username')}
        className={'mb-2'}
        placeholder={t('fullName')}
        type={'text'}
      />
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
      <FormInput
        {...bindFieldToForm('confirmPassword')}
        className={'mb-2'}
        placeholder={t('confirmPassword')}
        type={'password'}
      />
      {errorMessage && <p className={'text-error'}>{errorMessage}</p>}
      <Button
        block
        className={'mt-4'}
        disabled={isDisabled}
        type={'submit'}
        color={'success'}
      >{t('signUp')}</Button>
    </form>
  )
}

const SignInLink = () => {
  const signInPath = usePathLocalization(ROUTE_CONF.SIGN_IN)

  return (
    <p className={'text-center'}>
      <Trans i18nKey={'accountExists'}>
        Already have an account? <Link className={'text-primary'} to={signInPath}>Sign in</Link>
      </Trans>
    </p>
  )
}

export default SignUp
