import React from 'react'

import ReactWeather, { useOpenWeather } from 'react-open-weather'

import './weather-widget.scss'

const WeatherWidget = (props) => {
  const { data } = useOpenWeather({
    key: '8c220c5fa236b4413e25854b3a34205c',
    lat: props.data.coord.lat,
    lon: props.data.coord.lon,
    lang: 'en',
    unit: 'metric',
  })

  return (
    <ReactWeather
      data={data}
      lang="en"
      locationLabel={props.data.name}
      unitsLabels={{ temperature: 'ºC', windSpeed: 'Km/h' }}
      showForecast
    />
  )
}

export default WeatherWidget
