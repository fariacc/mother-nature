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
  RESET_PLANTS_SUCCESS,
} from './actionTypes'
import { beginApiCall, apiCallError } from './apiStatus'
import firebase from '../../services/firebase'

function getDateTime() {
  let day = new Date().getDate()
  let month = new Date().getMonth() + 1
  let year = new Date().getFullYear()
  let hours = new Date().getHours()
  let minutes = new Date().getMinutes()
  let seconds = new Date().getSeconds()
  let datetime = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
  return datetime
}

// adding a new plant
export const add = (plant, user) => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .database()
      .ref(`${user}/plants`)
      .push({
        label: plant.label,
        value: plant.label.toLowerCase(),
        type: plant.type,
        status: [
          {
            health: plant.health,
            date: getDateTime(),
          },
        ],
      })
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
export const fetchAll = (user) => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .database()
      .ref(`${user}/plants`)
      .on(
        'value',
        function (snapshot) {
          let plants = []
          snapshot.forEach((plant) => {
            const plantValues = plant.val()
            plants.push({
              id: plant.key,
              label: plantValues.label,
              value: plantValues.label,
              type: plantValues.type,
              status: plantValues.status,
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
              "Something went wrong, we couldn't get all your plants. Please try again",
          })
        }
      )
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: FETCH_PLANTS_ERROR,
      payload:
        "Something went wrong, we couldn't get all your plants. Please try again",
    })
  }
}

// fetching a specific plant from database
export const fetch = (plantId, userId) => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .database()
      .ref(`${userId}/plants/${plantId}`)
      .on(
        'value',
        function (snapshot) {
          let plant = []
          plant = [snapshot.val()]
          if (plant[0]) {
            const plantValues = plant.map((item) => {
              return {
                id: plantId,
                label: item.label,
                value: item.label,
                type: item.type,
                status: item.status,
              }
            })
            dispatch({
              type: FETCH_PLANT_SUCCESS,
              payload: plantValues,
            })
          }
        },
        function () {
          dispatch({
            type: FETCH_PLANT_ERROR,
            payload:
              "Something went wrong, we couldn't get the data on this plant. Please try again",
          })
        }
      )
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: FETCH_PLANT_ERROR,
      payload:
        "Something went wrong, we couldn't get the data on this plant. Please try again",
    })
  }
}

export const remove = (plantId, userId) => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .database()
      .ref(`${userId}/plants/${plantId}`)
      .remove()
      .then(() => {
        // Removing the plant was successful
        dispatch({
          type: REMOVE_PLANT_SUCCESS,
          payload: 'The plant was successfully removed',
        })
      })
      .catch(() => {
        dispatch({
          type: REMOVE_PLANT_ERROR,
          payload:
            "Something went wrong, we couldn't remove this plant. Please try again",
        })
      })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: REMOVE_PLANT_ERROR,
      payload:
        "Something went wrong, we couldn't remove this plant. Please try again",
    })
  }
}

export const update = (plant, userId) => async (dispatch) => {
  try {
    dispatch(beginApiCall())
    firebase
      .database()
      .ref(`${userId}/plants/${plant.id}`)
      .update({
        ...plant,
        status: [
          ...plant.status,
          {
            health: plant.health,
            date: getDateTime(),
          },
        ],
      })
      .then(() => {
        // Updating the plant was successful
        dispatch({
          type: UPDATE_PLANT_SUCCESS,
          payload: 'The plant was successfully updated!',
        })
      })
      .catch(() => {
        dispatch({
          type: UPDATE_PLANT_ERROR,
          payload:
            "Something went wrong, we couldn't update this plant. Please try again",
        })
      })
  } catch (err) {
    dispatch(apiCallError())
    dispatch({
      type: UPDATE_PLANT_ERROR,
      payload:
        "Something went wrong, we couldn't update this plant. Please try again",
    })
  }
}

export const resetPlantData = () => async (dispatch) => {
  dispatch({ type: RESET_PLANTS_SUCCESS })
}
