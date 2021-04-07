import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  EMAIL_NOT_VERIFIED,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  RESET_SUCCESS,
  RESET_ERROR,
} from './actionTypes'
import { beginApiCall, apiCallError } from './apiStatus'
import firebase from '../../services/firebase'

// Signing up with Firebase
export const signup = (email, password) => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((dataBeforeEmail) => {
        firebase.auth().onAuthStateChanged(function (user) {
          user.sendEmailVerification()
        })
      })
      .then((dataAfterEmail) => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            // Sign up successful
            dispatch({
              type: SIGNUP_SUCCESS,
              payload:
                'Your account was successfully created! Now you need to verify your e-mail address. Please go check your inbox',
            })
          } else {
            // Signup failed
            dispatch({
              type: SIGNUP_ERROR,
              payload:
                "Something went wrong, we couldn't create your account. Please try again",
            })
          }
        })
      })
      .catch((error) => {
        dispatch(apiCallError())
        if (error.code === 'auth/weak-password') {
          dispatch({
            type: SIGNUP_ERROR,
            payload: 'Your password has to be at least 6 characters',
          })
        } else if (error.code === 'auth/email-already-in-use') {
          dispatch({
            type: SIGNUP_ERROR,
            payload: 'This e-mail is already taken. Please choose another one',
          })
        } else {
          dispatch({
            type: SIGNUP_ERROR,
            payload:
              "Something went wrong, we couldn't create your account. Please try again",
          })
        }
      })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: SIGNUP_ERROR,
      payload:
        "Something went wrong, we couldn't create your account. Please try again",
    })
  }
}

// Signing in with Firebase
export const signin = (email, password, callback) => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        if (data.user.emailVerified) {
          dispatch({
            type: SIGNIN_SUCCESS,
            payload: data.user,
          })
          callback()
        } else {
          dispatch({
            type: EMAIL_NOT_VERIFIED,
            payload:
              "You haven't verified your e-mail address yet. Please check your inbox",
          })
        }
      })
      .catch((error) => {
        dispatch(apiCallError())
        dispatch({
          type: SIGNIN_ERROR,
          payload: 'Invalid login credentials',
        })
      })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({ type: SIGNIN_ERROR, payload: 'Invalid login credentials' })
  }
}

// Signing out with Firebase
export const signout = () => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS })
      })
      .catch(() => {
        dispatch(apiCallError())
        dispatch({
          type: SIGNOUT_ERROR,
          payload: 'Error, we were not able to log you out. Please try again',
        })
      })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: SIGNOUT_ERROR,
      payload: 'Error, we were not able to log you out. Please try again',
    })
  }
}

// Reset password with Firebase
export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() =>
        dispatch({
          type: RESET_SUCCESS,
          payload:
            "Check your inbox. We've sent you a secured reset link by e-mail",
        })
      )
      .catch(() => {
        dispatch(apiCallError())
        dispatch({
          type: RESET_ERROR,
          payload:
            "Oops, something went wrong we couldn't send you the e-mail. Try again and if the error persists, contact admin",
        })
      })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({ type: RESET_ERROR, payload: err })
  }
}
