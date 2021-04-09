import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { fetchAll } from '../../../store/actions/plants'

import Chart from '../../base/chart/Chart'
import Card from '../../base/card/Card'

import './history.scss'

const History = ({ user, plants, fetchAll }) => {
  const [chartPlantsHistorySettings] = useState({
    chart: {
      caption: 'Plant history',
      yaxisname: 'Soil moisture',
      numbersuffix: ' %',
      rotatelabels: '1',
      setadaptiveymin: '1',
      theme: 'fusion',
    },
  })

  useEffect(() => {
    fetchAll(user)
  }, [fetchAll, user])

  // const chartPlantsHistory = {
  //   chart: {
  //     caption: 'Plant history',
  //     yaxisname: 'Soil moisture',
  //     numbersuffix: ' %',
  //     rotatelabels: '1',
  //     setadaptiveymin: '1',
  //     theme: 'fusion',
  //   },
  //   data: plants.map((plant) => {
  //     return {
  //       label: plant.label,
  //       value: plant.health,
  //     }
  //   }),
  // }

  return (
    <div className="my-plants">
      <div className="dashboard-cards">
        <Card className="card-center card-green" label="History">
          {plants && plants.length !== 0 ? (
            <Chart
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
              chartSettings={chartPlantsHistorySettings}
            />
          ) : (
            <p style={{ padding: '10px 20px' }}>
              You have no plants registered yet.
            </p>
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAll: (user) => dispatch(fetchAll(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)
