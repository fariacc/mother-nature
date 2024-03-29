import React, { useEffect } from 'react'
import { connect } from 'react-redux'

const requireAuth = (ChildComponent) => {
  const ComposedComponent = (props) => {
    useEffect(() => {
      if (
        props.auth.isLoaded &&
        props.auth.isEmpty &&
        props.auth.emailVerified
      ) {
        props.history.push('/')
      }
    }, [props.auth, props.history])

    return <ChildComponent {...props} />
  }

  function mapStateToProps(state) {
    return {
      auth: state.firebaseReducer.auth,
    }
  }

  return connect(mapStateToProps)(ComposedComponent)
}

export default requireAuth
