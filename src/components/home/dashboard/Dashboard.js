import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { fetch, fetchAll } from '../../../store/actions/plants'

import Card from '../../base/card/Card'
// import Chart from '../../base/chart/Chart'
import WeatherWidget from '../../base/weatherWidget/WeatherWidget'

import './dashboard.scss'

const Dashboard = ({ plants, fetch, fetchAll, user }) => {
  // const [chartSpecificPlantHistorySettings] = useState({
  //   chart: {
  //     caption: 'Specific plant history',
  //     yaxisname: 'Soil moisture',
  //     numbersuffix: ' %',
  //     rotatelabels: '1',
  //     setadaptiveymin: '1',
  //     theme: 'fusion',
  //   },
  // })

  useEffect(() => {
    fetchAll(user)
  }, [fetchAll, user])

  function handleSelectOption(plantId) {
    fetch(plantId, user)
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">
        <Card className="card-center card-green" label="Plants information">
          {plants && plants.length !== 0 ? (
            <>
              <p className="card-subtitle">
                Select the plant you want to get info about
              </p>
              <ul className="my-plants-list">
                {plants.map((plant) => {
                  return (
                    <li
                      className="my-plants-list-item"
                      id={plant.id}
                      key={plant.id}
                      onClick={() => handleSelectOption(plant.id)}
                    >
                      <h3 className="my-plants-list-item-title">
                        {plant.label}
                      </h3>
                      <p className="my-plants-list-item-description">
                        Type: {plant.type}
                      </p>
                      <p className="my-plants-list-item-description">
                        Health status: {plant.health}%
                      </p>
                    </li>
                  )
                })}
              </ul>
            </>
          ) : (
            <p style={{ padding: '10px 20px' }}>
              You have no plants registered yet.
            </p>
          )}
          {/* <Chart
            type="line"
            width="25%"
            height="400"
            dataFormat="JSON"
            chartData={plants.map((plant) => {
              return {
                label: plant.label,
                value: plant.health,
              }
            })}
            chartSettings={chartSpecificPlantHistorySettings}
          /> */}
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
