import React, { Component } from 'react'

import { connect } from 'react-redux'

import './header.scss'

export class Header extends Component {
  handleMenu = () => {
    this.props.onHandleMenu()
  }

  render() {
    return (
      <div className="header">
        {/* <span>{auth.email}</span> */}
        <div className="header-menu-icon">
          <i
            className="fa fa-bars fa-lg"
            aria-hidden="true"
            onClick={this.handleMenu}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default connect(mapStateToProps)(Header)
