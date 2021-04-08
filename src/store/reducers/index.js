import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './auth'
import plantReducer from './plants'
import apiStatusReducer from './apiStatus'

export default combineReducers({
  firebaseReducer,
  authReducer,
  apiStatusReducer,
  plantReducer,
})
