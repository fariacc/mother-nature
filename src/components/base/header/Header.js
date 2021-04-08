import React from 'react'

import { connect } from 'react-redux'

import './header.scss'

const Header = ({ onHandleMenu, auth }) => {
  return (
    <div className="header">
      <span className="header-username">Welcome, {auth.email}</span>
      <div className="header-menu-icon">
        <i
          className="fa fa-bars fa-lg"
          aria-hidden="true"
          onClick={() => onHandleMenu()}
        />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default connect(mapStateToProps)(Header)
