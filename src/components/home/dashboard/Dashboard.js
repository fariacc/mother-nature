import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { fetch, fetchAll, update } from '../../../store/actions/plants'
import { getWeatherData } from '../../../store/actions/weather'

import Card from '../../base/card/Card'
import Chart from '../../base/chart/Chart'
import Loader from '../../base/loader/Loader'
import WeatherWidget from '../../base/weatherWidget/WeatherWidget'
import Button from '../../base/button/Button'
import Input from '../../base/input/Input'
import Select from 'react-select'

import './dashboard.scss'

const Dashboard = ({
  plant,
  fetch,
  plants,
  fetchAll,
  user,
  weatherData,
  getWeatherData,
  update,
}) => {
  let [specificPlant, setSpecificPlant] = useState([
    {
      name: '',
      value: '',
      type: '',
      health: '',
    },
  ])

  const chartSpecificPlantHistorySettings = {
    chart: {
      caption: 'Plant history',
      yaxisname: 'Soil moisture',
      numbersuffix: ' %',
      rotatelabels: '1',
      setadaptiveymin: '1',
      theme: 'fusion',
    },
  }

  useEffect(() => {
    fetchAll(user)
    if (weatherData === undefined) {
      getWeatherData()
    }
  }, [fetchAll, getWeatherData, weatherData, user])

  function handleSelectOption(selectedPlant) {
    const plantId = selectedPlant.id
    fetch(plantId, user)
  }

  function handleUpdatePlant() {
    update(specificPlant[0], user)
    fetch(specificPlant[0].id, user)
    fetchAll(user)
  }

  function handleChange(e) {
    setSpecificPlant([{ ...plant[0], health: e.target.value }])
  }

  return (
    <div className="dashboard">
      <h1>DASHBOARD</h1>
      <h2>Here you can check how your plants are doing</h2>
      <div className="dashboard-cards">
        <Card className="card-center card-green" label="Plants information">
          {plants && plants.length !== 0 ? (
            <Select
              placeholder="Select the plant you want to get information about"
              options={plants}
              onChange={handleSelectOption}
            />
          ) : (
            <p className="card-subtitle">You have no plants registered yet.</p>
          )}
          {plant && plant.length !== 0 && (
            <div className="my-plants-update">
              <Input
                label="Name"
                type="text"
                className="input--default"
                id="name"
                name="name"
                value={plant[0].name}
                placeholder="Name"
                disabled
              />

              <Input
                label="Type"
                type="text"
                className="input--default"
                id="type"
                name="type"
                value={plant[0].type}
                placeholder="Type"
                disabled
              />

              <Input
                label="Health status"
                type="number"
                className="input--default"
                id="health"
                min="0"
                max="100"
                name="health"
                value={specificPlant[0].health}
                placeholder="Health status, from 0 to 100"
                onChange={handleChange}
              />

              <Button
                type="submit"
                className="btn-primary"
                onClick={() => handleUpdatePlant(plant[0])}
              >
                Update health status
              </Button>

              <Chart
                type="line"
                width="25%"
                height="400"
                dataFormat="JSON"
                chartData={plant.map((item) => {
                  return {
                    label: item.name,
                    value: item.health,
                  }
                })}
                chartSettings={chartSpecificPlantHistorySettings}
              />
            </div>
          )}
        </Card>
      </div>
      <h2>Here's the weather now and the forecaster for the next days</h2>
      <div className="dashboard-cards">
        <Card className="card-center">
          {weatherData === undefined ? (
            <Loader />
          ) : (
            <WeatherWidget data={weatherData} />
          )}
        </Card>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.firebaseReducer.auth.uid,
    plants: state.plantReducer.plants,
    plant: state.plantReducer.plant,
    weatherData: state.weatherReducer.weatherData,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (plant, user) => dispatch(fetch(plant, user)),
    fetchAll: (user) => dispatch(fetchAll(user)),
    getWeatherData: () => dispatch(getWeatherData()),
    update: (plant, user) => dispatch(update(plant, user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
