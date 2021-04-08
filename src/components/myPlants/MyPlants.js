import React, { useState } from 'react'

import { connect } from 'react-redux'
import { add } from '../../store/actions/plants'

import Chart from '../base/chart/Chart'
import Card from '../base/card/Card'
import Input from '../base/input/Input'
import Button from '../base/button/Button'
import Spinner from '../base/spinner/Spinner'

import './my-plants.scss'

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

const MyPlants = ({ authMsg, add, fetch, remove, fetchAll, update }) => {
  //   const [selectedOption, setSelectedOption] = useState(false)
  const [plantName, setPlantName] = useState()
  const [plantType, setPlantType] = useState()
  //   const [plants, setPlants] = useState()
  const [loading, setLoading] = useState(false)

  //   function handleSelectOption(selectedOption) {
  //     setSelectedOption(selectedOption)
  //   }

  function handleChange(e) {
    if (e.target.name === 'name') {
      setPlantName(e.target.value)
    } else {
      setPlantType(e.target.value)
    }
  }

  function handleAddPlant(e) {
    setLoading(true)
    const plant = {
      value: plantName,
      type: plantType,
    }
    add(plant)
    setLoading(false)
    // fetch()
  }

  return (
    <div className="my-plants">
      <p className="my-plants-title">
        Do you want to add a new plant to the monitor?
      </p>
      <div>
        <Input
          label="Name"
          type="text"
          className="input--default"
          id="name"
          name="name"
          value={plantName}
          placeholder="Name"
          onChange={handleChange}
        />

        <Input
          label="Type"
          type="text"
          className="input--default"
          id="type"
          name="type"
          value={plantType}
          placeholder="Type"
          onChange={handleChange}
        />

        <div>
          <Button
            type="submit"
            className="btn-primary"
            onClick={handleAddPlant}
          >
            {loading ? <Spinner /> : 'Add plant'}
          </Button>
        </div>
      </div>

      <div className="dashboard-cards">
        <Card className="card-center">
          <Chart
            type="line"
            width="25%"
            height="400"
            dataFormat="JSON"
            chartData={chartData}
          />
        </Card>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    fetch: state.plantReducer.plant,
    fetchAll: state.plantReducer.plants,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (plant) => dispatch(add(plant)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPlants)
