import React from 'react'

import { connect } from 'react-redux'

import './header.scss'

const Header = ({ auth }) => {
  return (
    <div className="header">
      <span>{auth.email}</span>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default connect(mapStateToProps)(Header)
