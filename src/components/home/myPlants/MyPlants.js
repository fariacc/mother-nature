import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { add, fetchAll, remove } from '../../../store/actions/plants'

import Card from '../../base/card/Card'
import Chart from '../../base/chart/Chart'
import Input from '../../base/input/Input'
import Button from '../../base/button/Button'

import './my-plants.scss'

const MyPlants = ({ user, plants, add, remove, fetchAll }) => {
  const chartPlantsPerHealthValueSettings = {
    chart: {
      caption: 'Health status of plants',
      xaxisname: 'Plant',
      yaxisname: 'Health status',
      numbersuffix: '%',
      rotatelabels: '1',
      setadaptiveymin: '1',
      theme: 'fusion',
    },
  }

  const [plant, setPlant] = useState({
    label: '',
    type: '',
    health: '',
  })

  useEffect(() => {
    fetchAll(user)
  }, [fetchAll, user])

  function handleChange(e) {
    setPlant({ ...plant, [e.target.name]: e.target.value })
  }

  function validateFields(plant) {
    if (!plant.label || !plant.type || !plant.health) {
      alert('Please insert valid data. Fields can not be empty.')
      return false
    } else if (plant.health < 0 || plant.health > 100) {
      setPlant({ ...plant, health: '' })
      alert('Health status value must be between 0 and 100.')
      return false
    }
    return true
  }

  function handleAddPlant() {
    if (validateFields(plant)) {
      add(plant, user)
      fetchAll(user)
      setPlant({
        label: '',
        type: '',
        health: '',
      })
    }
  }

  function handleRemovePlant(plantId) {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you really want to remove this plant?')) {
      remove(plantId, user)
      fetchAll(user)
    }
  }

  return (
    <div className="my-plants">
      <h1>MY PLANTS</h1>
      <div className="dashboard-cards">
        <Card className="card-center card-green" label="Monitored plants">
          {plants && plants.length !== 0 ? (
            <>
              <p className="card-subtitle">
                You can choose a plant to remove by clicking on it
              </p>
              <ul className="my-plants-list">
                {plants.map((plant) => {
                  return (
                    <li
                      className="my-plants-list-item"
                      id={plant.id}
                      key={plant.id}
                      onClick={() => handleRemovePlant(plant.id)}
                    >
                      <h3 className="my-plants-list-item-title">
                        {plant.label}
                      </h3>
                      <p className="my-plants-list-item-description">
                        Type: {plant.type}
                      </p>
                      <p className="my-plants-list-item-description">
                        Health status:{' '}
                        {plant.status[plant.status.length - 1].health}%
                      </p>
                    </li>
                  )
                })}
              </ul>
            </>
          ) : (
            <p className="card-subtitle">You have no plants registered yet.</p>
          )}
        </Card>
      </div>
      <h2>Do you want to add a new plant to monitor?</h2>
      <div className="my-plants-info">
        <div className="my-plants-add">
          <Input
            label="Name"
            type="text"
            className="input--default"
            id="name"
            name="label"
            value={plant.label}
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

          <Button
            type="submit"
            className="btn-primary"
            onClick={handleAddPlant}
          >
            Add plant
          </Button>
        </div>
        {plants && plants.length !== 0 ? (
          <Chart
            type="bar2d"
            width="100%"
            height="400"
            dataFormat="JSON"
            chartData={plants.map((plant) => {
              return {
                label: plant.label,
                value: plant.status[plant.status.length - 1].health,
              }
            })}
            chartSettings={chartPlantsPerHealthValueSettings}
          />
        ) : (
          <Chart
            type="bar2d"
            width="100%"
            height="400"
            dataFormat="JSON"
            chartData={{}}
            chartSettings={chartPlantsPerHealthValueSettings}
          />
        )}
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
    add: (plantId, user) => dispatch(add(plantId, user)),
    fetchAll: (user) => dispatch(fetchAll(user)),
    remove: (plant, user) => dispatch(remove(plant, user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPlants)
