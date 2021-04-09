import React, { Component } from 'react'
import axios from 'axios'

class WeatherWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      geolocation: {
        latitude: '',
        longitude: '',
      },
    }
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        var latitude = position.coords.latitude
        var longitude = position.coords.longitude

        const result = await axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=8c220c5fa236b4413e25854b3a34205c`
        )
        console.log(result.data)
      })
    }
  }

  render() {
    return (
      <div>
        {/* <p>
        Conditions: {this.props.weatherData.weather[0].main} -{' '}
        {this.props.weatherData.weather[0].description}
      </p>
      <p>Temperature: {this.props.weatherData.main.temp} °F</p>
      <p>
        Min temperature: {Math.round(this.props.weatherData.main.temp_min)} °F
      </p>
      <p>
        Max temperature: {Math.round(this.props.weatherData.main.temp_max)} °F
      </p>
      <p>Feels like: {Math.round(this.props.weatherData.main.feels_like)} °F</p>
      <p>Pressure: {this.props.weatherData.main.pressure} hpa</p>
      <p>Humidity: {this.props.weatherData.main.humidity} %</p> */}
      </div>
    )
  }
}

export default WeatherWidget
