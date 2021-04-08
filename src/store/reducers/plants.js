import {
  ADD_PLANT_SUCCESS,
  ADD_PLANT_ERROR,
  FETCH_PLANT_SUCCESS,
  FETCH_PLANT_ERROR,
  REMOVE_PLANT_SUCCESS,
  REMOVE_PLANT_ERROR,
  FETCH_PLANTS_SUCCESS,
  FETCH_PLANTS_ERROR,
  UPDATE_PLANT_SUCCESS,
  UPDATE_PLANT_ERROR,
} from '../actions/actionTypes'

const INITIAL_STATE = {
  authMsg: '',
}

export default function plantReducer(state = INITIAL_STATE, action) {
  if (action.type === FETCH_PLANT_SUCCESS) {
    return { ...state, authMsg: '', plant: action.payload }
  } else if (action.type === FETCH_PLANTS_SUCCESS) {
    return { ...state, authMsg: '', plants: action.payload }
  } else if (
    action.type === ADD_PLANT_SUCCESS ||
    action.type === ADD_PLANT_ERROR ||
    action.type === FETCH_PLANT_ERROR ||
    action.type === REMOVE_PLANT_SUCCESS ||
    action.type === REMOVE_PLANT_ERROR ||
    action.type === FETCH_PLANTS_ERROR ||
    action.type === UPDATE_PLANT_SUCCESS ||
    action.type === UPDATE_PLANT_ERROR
  ) {
    return { ...state, authMsg: action.payload }
  } else {
    return state
  }
}
