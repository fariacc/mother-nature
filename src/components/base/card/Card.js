import React from 'react'

import './card.scss'

function Card(props) {
  return (
    <div className={`card ${props.className}`}>
      {props.label && (
        <div className={`card-inner ${props.className}-inner`}>
          <p className={`card-label ${props.className}-label`}>{props.label}</p>
        </div>
      )}
      {props.children}
    </div>
  )
}

export default Card
