import React from 'react'

import Header from '../header/Header'

import './dashboard.scss'

function Dashboard(props) {
  return (
    <div className="dashboard">
      <Header></Header>
      <div className="dashboard-content">{props.children}</div>
    </div>
  )
}

export default Dashboard
