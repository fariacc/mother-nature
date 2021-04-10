import { WEATHER_SUCCESS } from './actionTypes'
import axios from 'axios'

export const getWeatherData = () => async (dispatch) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude

      const weather = await axios(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=8c220c5fa236b4413e25854b3a34205c`
      )

      dispatch({
        type: WEATHER_SUCCESS,
        payload: weather.data,
      })
    })
  }
}
