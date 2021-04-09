import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { fetch, fetchAll } from '../../../store/actions/plants'

import Card from '../../base/card/Card'
import Chart from '../../base/chart/Chart'
import WeatherWidget from '../../base/weatherWidget/WeatherWidget'
import Select from 'react-select'

import './dashboard.scss'

const Dashboard = ({ plant, fetch, plants, fetchAll, user }) => {
  let [specificPlant, setSpecificPlant] = useState([])

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
    setSpecificPlant(plant)
  }, [fetchAll, plant, user])

  function handleSelectOption(selectedPlant) {
    const plantId = selectedPlant.id
    fetch(plantId, user)
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
            <p style={{ padding: '10px 20px' }}>
              You have no plants registered yet.
            </p>
          )}
          {specificPlant && specificPlant.length !== 0 && (
            <Chart
              key={specificPlant[0].id}
              type="line"
              width="25%"
              height="400"
              dataFormat="JSON"
              chartData={specificPlant.map((plant) => {
                return {
                  label: plant.name,
                  value: plant.health,
                }
              })}
              chartSettings={chartSpecificPlantHistorySettings}
            />
          )}
        </Card>
      </div>
      <h2>Here's the weather now and the forecaster for the next days</h2>
      <div className="dashboard-cards">
        <Card className="card-center">
          <WeatherWidget />
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: (plant, user) => dispatch(fetch(plant, user)),
    fetchAll: (user) => dispatch(fetchAll(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
