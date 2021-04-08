import React, { useState } from 'react'

import { connect } from 'react-redux'
import { fetch } from '../../../store/actions/plants'

import Chart from '../../base/chart/Chart'
import Card from '../../base/card/Card'
import WeatherWidget from '../../base/weatherWidget/WeatherWidget'
import Select from 'react-select'

import './dashboard.scss'

const chartData = {
  chart: {
    caption: 'Average Fastball Velocity',
    yaxisname: 'Velocity (in mph)',
    subcaption: '[2005-2016]',
    numbersuffix: ' mph',
    rotatelabels: '1',
    setadaptiveymin: '1',
    theme: 'fusion',
  },
  data: [
    {
      label: '2005',
      value: '89.45',
    },
    {
      label: '2006',
      value: '89.87',
    },
    {
      label: '2007',
      value: '89.64',
    },
    {
      label: '2008',
      value: '90.13',
    },
    {
      label: '2009',
      value: '90.67',
    },
  ],
}

const selectOptions = [
  {
    value: 'thyme',
    label: 'Thyme',
    type: 'Vegetable',
  },
  {
    value: 'lettuce',
    label: 'Lettuce',
    type: 'Vegetable',
  },
  {
    value: 'basil',
    label: 'Isreal',
    type: 'Herb',
  },
]

const Dashboard = ({ plant, fetch, geolocation }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  function handleSelectOption(selectedOption) {
    setSelectedOption(selectedOption)
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="subtitle">Select the plant you want to get info about</p>
      <Select
        className="dashboard-select"
        classNamePrefix="dashboard-select-box"
        value={selectedOption}
        options={selectOptions}
        onChange={handleSelectOption}
        isSearchable
      />
      <div className="dashboard-cards">
        <Card className="card-center card-green" label="Plants information">
          <Chart
            type="line"
            width="25%"
            height="400"
            dataFormat="JSON"
            chartData={chartData}
          />
        </Card>
      </div>
      <p className="subtitle">
        Here's the weather right now and the forecaster for the next days
      </p>
      <div className="dashboard-cards">
        <Card className="card-center">
          <WeatherWidget data={geolocation} />
        </Card>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  console.log(state)
  return {
    plant: state.plantReducer.plant,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: () => dispatch(fetch()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
