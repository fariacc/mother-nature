import React from 'react'

import { connect } from 'react-redux'

import Sidebar from '../base/sidebar/Sidebar'
import Dashboard from '../base/dashboard/Dashboard'
import Chart from '../base/chart/Chart'

import './home.scss'

const dataSource = {
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
    {
      label: '2010',
      value: '90.54',
    },
    {
      label: '2011',
      value: '90.75',
    },
    {
      label: '2012',
      value: '90.8',
    },
    {
      label: '2013',
      value: '91.16',
    },
    {
      label: '2014',
      value: '91.37',
    },
    {
      label: '2015',
      value: '91.66',
    },
    {
      label: '2016',
      value: '91.8',
    },
  ],
}

const Home = ({ auth }) => {
  return (
    <div className="home">
      <Sidebar></Sidebar>
      <Dashboard>
        <>
          <h1>Welcome on Home</h1>
          <p>{auth.email}, You have successfully signed in, congrats!</p>
          <span className="emoji" role="img" aria-label="House With Garden">
            🏡
          </span>
          <Chart
            type="line"
            width="600"
            height="400"
            dataFormat="JSON"
            chart={dataSource}
          />
        </>
      </Dashboard>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default connect(mapStateToProps)(Home)
