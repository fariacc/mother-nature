import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import {
  fetch,
  fetchAll,
  update,
  resetPlantData,
} from '../../../store/actions/plants'

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
  resetPlantData,
}) => {
  let [specificPlant, setSpecificPlant] = useState([
    {
      label: '',
      value: '',
      type: '',
      health: '',
    },
  ])

  const chartSpecificPlantHistorySettings = {
    chart: {
      caption: 'Health history of plant',
      xaxisname: 'Date of registration',
      yaxisname: 'Health status',
      numbersuffix: '%',
      rotatelabels: '1',
      setadaptiveymin: '1',
      theme: 'fusion',
    },
  }

  useEffect(() => {
    resetPlantData()
    fetchAll(user)
    if (weatherData === undefined) {
      getWeatherData()
    }
  }, [resetPlantData, fetchAll, getWeatherData, weatherData, user])

  function handleSelectOption(selectedPlant) {
    const plantId = selectedPlant.id
    fetch(plantId, user)
  }

  function handleUpdatePlant() {
    if (validateFields(specificPlant[0])) {
      update(specificPlant[0], user)
      fetch(specificPlant[0].id, user)
      fetchAll(user)
    }
  }

  function handleChange(e) {
    setSpecificPlant([{ ...plant[0], health: e.target.value }])
  }

  function validateFields(plantToValidade) {
    if (plantToValidade.health < 0 || plantToValidade.health > 100) {
      setSpecificPlant({ ...plantToValidade, health: '' })
      alert('Health status value must be between 0 and 100.')
      return false
    }
    setSpecificPlant({ ...plantToValidade, health: plantToValidade.health })
    return true
  }

  return (
    <div className="dashboard">
      <h1>DASHBOARD</h1>
      <h2>Check how your plants are doing</h2>
      <div className="dashboard-cards">
        <Card className="card-center card-green" label="Plant information">
          {plants && plants.length !== 0 ? (
            <Select
              placeholder="Select the plant you want to get information about"
              options={plants}
              onChange={handleSelectOption}
            />
          ) : (
            <p>
              You have no plants registered yet. Go to 'My plants' so you can
              register it.
            </p>
          )}
          {plant && plant.length !== 0 && (
            <div className="my-plant-info">
              <div className="my-plant-update">
                <Input
                  label="Name"
                  type="text"
                  className="input--default"
                  id="name"
                  name="label"
                  value={plant[0].label}
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
                  value={specificPlant.health}
                  placeholder="Health status, from 0 to 100"
                  onChange={handleChange}
                />

                <Button
                  type="submit"
                  className="btn-primary"
                  onClick={handleUpdatePlant}
                >
                  Update plant
                </Button>
              </div>
              <Chart
                type="line"
                width="100%"
                height="400"
                dataFormat="JSON"
                chartData={plant[0].status.map((item) => {
                  return {
                    label: item.date,
                    value: item.health,
                  }
                })}
                chartSettings={chartSpecificPlantHistorySettings}
              />
            </div>
          )}
        </Card>
      </div>
      {navigator.geolocation && weatherData === undefined ? (
        <Loader />
      ) : (
        <>
          <h2>Weather and forecaster for the next days</h2>
          <div className="dashboard-cards">
            <WeatherWidget data={weatherData} />
          </div>
        </>
      )}
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
    resetPlantData: () => dispatch(resetPlantData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
