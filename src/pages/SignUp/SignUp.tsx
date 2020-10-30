import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Trans, useTranslation} from 'react-i18next'
import {FirebaseContext} from 'context/Firebase'
import Container from 'components/Container'
import FormInput from 'components/FormInput'
import Button from 'components/Button'
import Card from 'components/Card'
import {ROUTE_CONF} from 'routes'
import usePathLocalization from 'hooks/usePathLocalization'

const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

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
  const history = useHistory()
  const [values, setValues] = useState(initialValues)
  const [isDisabled, setDisabled] = useState(true)
  const [error, setError] = useState<Error | null>(null)
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
      await firebase!.createUserWithEmailAndPassword(email, password)
      await firebase!.updateProfile({displayName: username})
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
        placeholder={t('fullName')}
        name={'username'}
        type={'text'}
        value={values.username}
      />
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
      <FormInput
        className={'mb-2'}
        onChange={handleInputChange}
        placeholder={t('confirmPassword')}
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
