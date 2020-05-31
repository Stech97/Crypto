import React, { Component } from 'react'
import DashHeader from './components/header'
import Sidebar from './components/sidebar'
import DashContent from './components/content'
import '../styles/dashboard.scss'

class Dashboard extends Component {
  render() {
    return (
      <div className="dash-wrapper">
        <DashHeader />
        <Sidebar />
        <DashContent />
      </div>
    )
  }
}

export default Dashboard
