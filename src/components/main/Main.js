import React from 'react'
import { connect } from 'react-redux'

import Home from '../home/Home'
import Auth from '../auth/Auth'
import Loader from '../base/loader/Loader'

const Main = ({ auth }) => {
  return (
    <>
      {!auth.isLoaded ? (
        <Loader />
      ) : !auth.isEmpty && auth.emailVerified ? (
        <Home />
      ) : (
        <Auth />
      )}
    </>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
  }
}

export default connect(mapStateToProps)(Main)
