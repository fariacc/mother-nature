import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { fetch, fetchAll } from '../../../store/actions/plants'

import Card from '../../base/card/Card'
import WeatherWidget from '../../base/weatherWidget/WeatherWidget'
import Select from 'react-select'

import './dashboard.scss'

const Dashboard = ({ plants, fetch, fetchAll, user, plant }) => {
  const [selectedOption] = useState()

  useEffect(() => {
    fetchAll(user)
  }, [fetchAll, user])

  async function handleSelectOption(option) {
    await fetch(option.id, user)
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <Card className="card-center card-green" label="Plants information">
          <p className="subtitle">
            Select the plant you want to get info about
          </p>
          <Select
            className="dashboard-select"
            classNamePrefix="dashboard-select-box"
            value={selectedOption}
            options={plants}
            onChange={handleSelectOption}
            isSearchable
          />
        </Card>
      </div>
      <p className="subtitle">
        Here's the weather right now and the forecaster for the next days
      </p>
      <div className="dashboard-cards">
        {}
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
