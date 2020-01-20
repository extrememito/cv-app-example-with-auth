import React, { useState, useCallback } from 'react'
import { Screen } from './ui/Screen'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { signUp, login } from '../store/actions/auth.actions'

// eslint-disable-next-line
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passPattern = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

type FormData = {
  password: string
  email: string
}

export const Auth: React.FC<{ isRegister?: boolean }> = ({ isRegister }) => {
  const { register, handleSubmit, errors } = useForm<FormData>()
  const [loading, setLoading] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string>('')
  const dispatch = useDispatch()

  const onSubmit = useCallback(
    async (data: FormData) => {
      const { email, password } = data
      setLoading(true)
      setSubmitError('')

      try {
        isRegister
          ? await dispatch(signUp(email, password))
          : await dispatch(login(email, password))
      } catch (error) {
        setSubmitError(error)
      }
      setLoading(false)
    },
    [dispatch, setLoading, setSubmitError, isRegister]
  )

  const label = isRegister ? 'Register' : 'Login'

  return (
    <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Card
        style={{
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>{label}</h2>
        {submitError && <div>{submitError}</div>}
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            inputRef={register({
              required: { message: 'Please type your email', value: true },
              maxLength: { value: 40, message: 'Max length exceeded' },
              pattern: {
                value: emailPattern,
                message: 'Please type correct email',
              },
            })}
            label="Email"
            name="email"
            type="email"
          />
          {errors.email && errors.email.message && (
            <div>{errors.email.message}</div>
          )}
          {isRegister && (
            <TextField
              style={{ marginTop: '1rem' }}
              inputRef={register({
                required: { message: 'Please type your password', value: true },
                minLength: { value: 8, message: 'Min length is 8 characters' },
                pattern: {
                  value: passPattern,
                  message:
                    'Password should include letters, numbers, punctuation, and upper and lower case',
                },
              })}
              label="Password"
              name="password"
              type="password"
            />
          )}
          {!isRegister && (
            <TextField
              style={{ marginTop: '1rem' }}
              inputRef={register({
                required: { message: 'Please type your password', value: true },
              })}
              label="Password"
              name="password"
              type="password"
            />
          )}
          {errors.password && errors.password.message && (
            <div>{errors.password.message}</div>
          )}
          <Button
            style={{ marginTop: '1rem' }}
            variant="contained"
            color="primary"
            type="submit"
          >
            {loading ? <CircularProgress size={20} color="secondary" /> : label}
          </Button>
        </form>
      </Card>
    </Screen>
  )
}
