import React from 'react'

import { connect } from 'react-redux'
import { signout } from '../../../store/actions/auth'

import Button from '../button/Button'

import './sidebar.scss'

const sidebarItems = [
  { title: 'Dashboard', icon: 'fa fa-home fa-lg' },
  { title: 'My plants', icon: 'fa fa-pagelines fa-lg' },
  { title: 'History', icon: 'fa fa-history fa-lg' },
]

const Sidebar = ({ onHandleSelectedItem, className, signout }) => {
  const handleItemClick = (e) => {
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

    const activeElement = document.getElementsByClassName(
      'sidebar-items-item--active'
    )[0].innerText
    onHandleSelectedItem(activeElement)
  }

  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar-content">
        <div className="sidebar-logo"></div>
        <ul className="sidebar-items">
          {sidebarItems.map((item, index) => {
            return (
              <li
                key={index}
                className="sidebar-items-item"
                onClick={handleItemClick.bind(this)}
              >
                <span
                  className={
                    index !== 0
                      ? 'sidebar-items-item--default'
                      : 'sidebar-items-item--active'
                  }
                >
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
