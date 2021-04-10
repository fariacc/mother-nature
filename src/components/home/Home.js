import React, { Component } from 'react'

import Header from '../base/header/Header'
import Sidebar from '../base/sidebar/Sidebar'
import Dashboard from './dashboard/Dashboard'
import MyPlants from './myPlants/MyPlants'

import './home.scss'

class Home extends Component {
  state = { sidebarShow: true, currentLocation: 'Dashboard' }

  handleMenu = () => {
    this.setState({
      sidebarShow: !this.state.sidebarShow,
    })
  }

  handleSelectedItem = (selectedItem) => {
    this.setState({
      currentLocation: selectedItem,
    })
  }

  componentDidMount() {
    if (window.innerWidth > 768) {
      this.setState({
        sidebarShow: true,
      })
    } else {
      this.setState({
        sidebarShow: false,
      })
    }
  }

  render() {
    return (
      <div className="home">
        {this.state.sidebarShow ? (
          <Sidebar
            className="sidebar-default"
            onHandleSelectedItem={this.handleSelectedItem}
          />
        ) : (
          <Sidebar className="sidebar-hidden" />
        )}
        <Header onHandleMenu={this.handleMenu} />
        <div className="home-content">
          {this.state.currentLocation === 'Dashboard' && <Dashboard />}
          {this.state.currentLocation === 'My plants' && <MyPlants />}
        </div>
      </div>
    )
  }
}

export default Home
