import React from 'react'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { signout } from '../../../store/actions/auth'

import requireAuth from '../../hoc/requireAuth'

import Button from '../button/Button'

import './header.scss'

const Header = ({ signout, auth }) => {
  return (
    <div className="header">
      <Button className="btn-primary" onClick={() => signout()}>
        Log out
      </Button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signout: () => dispatch(signout()),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  requireAuth
)(Header)
