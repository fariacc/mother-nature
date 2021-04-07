import React from 'react'

import Chart from '../base/chart/Chart'
import Card from '../base/card/Card'
import WeatherWidget from '../base/weatherWidget/WeatherWidget'

import './dashboard.scss'

function Dashboard(props) {
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

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <Card className="card-center">
          <WeatherWidget />
        </Card>
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
      <div className="dashboard-cards">
        <Card className="card-left">
          <Chart
            type="column3d"
            width="50%"
            height="400"
            dataFormat="JSON"
            chartData={chartData}
          />
        </Card>
        <Card className="card-right">
          <Chart
            type="pie3d"
            width="50%"
            height="400"
            dataFormat="JSON"
            chartData={chartData}
          />
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
