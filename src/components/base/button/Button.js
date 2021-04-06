import React from 'react'

import './button.scss'

function Button(props) {
  return (
    <button
      type={props.type}
      className={`btn ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default Button
