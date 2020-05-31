import React, { Component } from 'react'
import DashHeader from './components/header'
import Sidebar from './components/sidebar'
import DashContent from './components/content'
import '../styles/dashboard.scss'

class Dashboard extends Component {
  constructor(props) {
      super(props);
      this.state = {isClosed: false};

      // Эта привязка обязательна для работы `this` в колбэке.
      this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
      this.setState(state => ({
        isToggleOn: !state.isClosed,
      }));
    }

  render() {
    return (
      <div className={this.state.isClosed ? "dash-wrapper-closed" : "dash-wrapper"}>
        <DashHeader />
        <Sidebar isClosed={this.state.isClosed} handleClick={this.handleClick}/>
        <DashContent />
      </div>
    )
  }
}

export default Dashboard
