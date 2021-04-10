import { WEATHER_SUCCESS } from '../actions/actionTypes'

const INITIAL_STATE = {
  authMsg: '',
}

const weatherReducer = (state = INITIAL_STATE, action) => {
  if (action.type === WEATHER_SUCCESS) {
    return { ...state, authMsg: '', weatherData: action.payload }
  } else {
    return state
  }
}

export default weatherReducer
