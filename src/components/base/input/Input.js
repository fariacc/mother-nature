import React from 'react'

import './input.scss'

function Input(props) {
  return (
    <div className="form-item">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        className={`input ${props.className}`}
        min={props.min}
        max={props.max}
        disabled={props.disabled}
        onClick={props.onClick}
        onChange={props.onChange}
        onInput={props.onInput}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      {props.children}
    </div>
  )
}

export default Input
