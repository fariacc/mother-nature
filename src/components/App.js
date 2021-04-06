import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Main from './main/Main'
import Auth from './auth/Auth'

import './app.scss'

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Auth} />
      </Switch>
    </div>
  )
}

export default App
