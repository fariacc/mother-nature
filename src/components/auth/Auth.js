import React, { useState } from 'react'

import { connect } from 'react-redux'
import { signup, signin, resetPassword } from '../../store/actions/auth'

import useForm from '../../utils/useForm'
import validate from '../../utils/validateAuthForm'

import Spinner from '../base/spinner/Spinner'
import Button from '../base/button/Button'
import Input from '../base/input/Input'

import './auth.scss'

const Auth = ({ authMsg, signup, signin, resetPassword, loading }) => {
  const [newUser, setNewUser] = useState(false)
  const [reset, SetReset] = useState(false)

  const [credentials, handleChange, handleSubmit, errors] = useForm(
    auth,
    validate,
    reset
  )

  function auth() {
    if (newUser) {
      // sign up method
      signup(credentials.email, credentials.password)
    } else {
      if (reset) {
        // reset password method
        resetPassword(credentials.email)
      } else {
        // sign in method
        signin(
          credentials.email,
          credentials.password,
          () => (window.location = '/')
        )
      }
    }
  }

  return (
    <div className="auth">
      <div className="auth-container">
        <h1>
          <i className="fa fa-leaf fa-3x"></i>
          <span>Mother Nature</span>
        </h1>
        <h2>
          {reset ? 'Reset password' : newUser ? 'Create an account' : 'Sign in'}
        </h2>
        {authMsg && <p className="auth-message">{authMsg}</p>}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <Input
            label="E-mail"
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            placeholder="E-mail"
            className={
              errors.emailIsEmpty || errors.emailFormatInvalid
                ? 'input--error'
                : 'input--default'
            }
            onChange={handleChange}
          >
            {errors.emailIsEmpty && <small>{errors.emailIsEmpty}</small>}
            {errors.emailFormatInvalid && (
              <small>{errors.emailFormatInvalid}</small>
            )}
          </Input>

          {!reset && (
            <>
              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                className={
                  errors.passIsEmpty || errors.passIsStrong
                    ? 'input--error'
                    : 'input--default'
                }
              >
                {errors.passIsStrong && <small>{errors.passIsStrong}</small>}
                {errors.passIsEmpty && <small>{errors.passIsEmpty}</small>}
              </Input>

              {!newUser && (
                <div style={{ marginBottom: 20 }}>
                  <small className="btn-link" onClick={() => SetReset(true)}>
                    Forgot password?
                  </small>
                </div>
              )}

              <div style={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  className="btn-primary"
                  onClick={() => {
                    SetReset(false)
                  }}
                >
                  {loading ? (
                    <Spinner />
                  ) : newUser ? (
                    'Create account'
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </div>
            </>
          )}

          {reset && (
            <>
              <div style={{ marginBottom: 20 }}>
                <small className="btn-link" onClick={() => SetReset(false)}>
                  Back to sign in
                </small>
              </div>

              <div style={{ textAlign: 'center' }}>
                <Button type="submit" className="btn-primary">
                  Reset password
                </Button>
              </div>
            </>
          )}
        </form>

        <footer className="auth-footer">
          <span>
            {newUser
              ? 'Already have an account? '
              : "Don't have an account yet? "}
            <span
              className="btn-link"
              onClick={() => {
                setNewUser(!newUser)
                if (reset) SetReset(false)
              }}
            >
              {newUser ? 'Sign in' : 'Create an account'}
            </span>
          </span>
        </footer>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    authMsg: state.authReducer.authMsg,
    loading: state.apiStatusReducer.apiCallsInProgress > 0,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (email, password) => dispatch(signup(email, password)),
    signin: (email, password, callback) =>
      dispatch(signin(email, password, callback)),
    resetPassword: (email) => dispatch(resetPassword(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
