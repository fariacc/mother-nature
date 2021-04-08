import {
  ADD_PLANT_SUCCESS,
  ADD_PLANT_ERROR,
  FETCH_PLANT_SUCCESS,
  FETCH_PLANT_ERROR,
  //   REMOVE_PLANT_SUCCESS,
  //   REMOVE_PLANT_ERROR,
  FETCH_PLANTS_SUCCESS,
  FETCH_PLANTS_ERROR,
  //   UPDATE_PLANT_SUCCESS,
  //   UPDATE_PLANT_ERROR,
} from './actionTypes'
import { beginApiCall, apiCallError } from './apiStatus'
import firebase from '../../services/firebase'

// adding a new plant
export const add = (plant) => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .database()
      .ref('plants')
      .push(plant)
      .then(() => {
        // Adding a new plant was successful
        dispatch({
          type: ADD_PLANT_SUCCESS,
          payload: 'The new plant was successfully added!',
        })
      })
      .catch(() => {
        dispatch({
          type: ADD_PLANT_ERROR,
          payload:
            "Something went wrong, we couldn't add this plant. Please try again",
        })
      })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: ADD_PLANT_ERROR,
      payload:
        "Something went wrong, we couldn't add this plant. Please try again",
    })
  }
}

// fetching plants from database
export const fetchAll = () => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .database()
      .ref('plants')
      .on(
        'value',
        function (snapshot) {
          let plants = []
          snapshot.forEach((plant) => {
            const plantValues = plant.val()
            plants.push({
              id: plant.key,
              name: plantValues.name,
              type: plantValues.type,
              health: plantValues.health,
            })
          })
          dispatch({
            type: FETCH_PLANTS_SUCCESS,
            payload: plants,
          })
        },
        function () {
          dispatch({
            type: FETCH_PLANTS_ERROR,
            payload:
              "Something went wrong, we couldn't create your account. Please try again",
          })
        }
      )
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: FETCH_PLANTS_ERROR,
      payload:
        "Something went wrong, we couldn't create your account. Please try again",
    })
  }
}

// fetching a specific plant from database
export const fetch = () => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .database()
      .ref('plants')
      .on(
        'value',
        function (snapshot) {
          dispatch({
            type: FETCH_PLANT_SUCCESS,
            payload: snapshot.val(),
          })
        },
        function () {
          dispatch({
            type: FETCH_PLANT_ERROR,
            payload:
              "Something went wrong, we couldn't create your account. Please try again",
          })
        }
      )
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: FETCH_PLANT_ERROR,
      payload:
        "Something went wrong, we couldn't create your account. Please try again",
    })
  }
}
