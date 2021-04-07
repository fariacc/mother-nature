import React from 'react'

import { connect } from 'react-redux'
import { signout } from '../../../store/actions/auth'

import Button from '../button/Button'

import './sidebar.scss'

const Sidebar = ({ items, signout }) => {
  const handleClick = (e) => {
    const activeElements = document.getElementsByClassName(
      'sidebar-items-item--active'
    )
    for (let i = 0; i < activeElements.length; i++) {
      activeElements[0].className = 'sidebar-items-item--default'
    }
    if (e.target.className === 'sidebar-items-item--active') {
      e.target.className = 'sidebar-items-item--default'
    } else {
      e.target.className = 'sidebar-items-item--active'
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-logo"></div>
        <ul className="sidebar-items">
          {items.map((item, index) => {
            return (
              <li
                key={index}
                className="sidebar-items-item"
                onClick={handleClick.bind(this)}
              >
                <span className="sidebar-items-item--default">
                  <i className={item.icon} /> {item.title}
                </span>
              </li>
            )
          })}
        </ul>
        <div className="sidebar-bottom">
          <li className="sidebar-bottom-item">
            <Button className="btn-primary btn-light" onClick={() => signout()}>
              Log out <i className="fa fa-sign-out fa-lg" />
            </Button>
          </li>
        </div>
      </div>
    </aside>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    signout: () => dispatch(signout()),
  }
}

export default connect(null, mapDispatchToProps)(Sidebar)
