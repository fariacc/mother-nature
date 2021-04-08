import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { add, fetchAll } from '../../../store/actions/plants'

import Chart from '../../base/chart/Chart'
import Card from '../../base/card/Card'
import Input from '../../base/input/Input'
import Button from '../../base/button/Button'
import Spinner from '../../base/spinner/Spinner'

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

const MyPlants = ({
  authMsg,
  plants,
  add,
  fetch,
  remove,
  fetchAll,
  update,
}) => {
  const [plant, setPlant] = useState({
    name: '',
    type: '',
    health: 0,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchAll()
    setLoading(false)
  }, [])

  function handleChange(e) {
    setPlant({ ...plant, [e.target.name]: e.target.value })
  }

  function handleAddPlant(e) {
    setLoading(true)
    add(plant)
    fetchAll()
    setPlant({ name: '', type: '', health: 0 })
    setLoading(false)
  }

  return (
    <div className="my-plants">
      <h1>My plants</h1>
      <p className="subtitle">Do you want to add a new plant to the monitor?</p>
      <div>
        <Input
          label="Name"
          type="text"
          className="input--default"
          id="name"
          name="name"
          value={plant.name}
          placeholder="Name"
          onChange={handleChange}
        />

        <Input
          label="Type"
          type="text"
          className="input--default"
          id="type"
          name="type"
          value={plant.type}
          placeholder="Type"
          onChange={handleChange}
        />

        <Input
          label="Health status"
          type="number"
          className="input--default"
          id="health"
          min="0"
          max="100"
          name="health"
          value={plant.health}
          placeholder="Health status, from 0 to 100"
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
        <Card className="card-center card-green" label="My plants">
          {plants && plants.length !== 0 ? (
            <ul>
              {plants.map((plant) => {
                return (
                  <li key={plant.id}>
                    <h3>{plant.name}</h3>
                    <p>Type: {plant.type}</p>
                    <p>Health status: {plant.health}</p>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p>You have no plants registered yet.</p>
          )}
        </Card>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    plants: state.plantReducer.plants,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    add: (plant) => dispatch(add(plant)),
    fetchAll: () => dispatch(fetchAll()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPlants)
