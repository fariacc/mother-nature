import React, { useState } from 'react'
import ReactWeather, { useOpenWeather } from 'react-open-weather'

import Loader from '../loader/Loader'

const WeatherWidget = () => {
  const [latitude, SetLatitude] = useState()
  const [longitude, SetLongitude] = useState()

  navigator.geolocation.getCurrentPosition(function (position) {
    SetLatitude(position.coords.latitude)
    SetLongitude(position.coords.longitude)
  })

  const { data, isLoading } = useOpenWeather({
    key: '8c220c5fa236b4413e25854b3a34205c',
    lat: latitude,
    lon: longitude,
    lang: 'en',
    unit: 'metric',
  })

  return (
    <div className="weather-widget">
      {isLoading ? (
        <Loader />
      ) : (
        <ReactWeather
          className="weather-widget__item"
          data={data}
          showForecast
        />
      )}
    </div>
  )
}

export default WeatherWidget
