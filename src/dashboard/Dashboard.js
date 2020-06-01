import React, { Component } from 'react'
import DashHeader from './components/header'
import Sidebar from './components/sidebar'
import DashContent from './components/content'
import '../styles/dashboard.scss'
import { connect } from 'react-redux';
import { toggleSidebar } from './actions/toggleSidebar'

class Dashboard extends Component {
    state = {
      isClosed: false
    };

    toggle = (value) => {
      this.setState({ isClosed: !value })
    }
    
  render() {
    return (
      <div className="dash">
        <div className={this.state.isClosed ? "dash-wrapper-closed" : "dash-wrapper"}>
          <DashHeader />
          <Sidebar isClosed={this.state.isClosed} toggle={this.toggle}/>
          <DashContent />
        </div>
      </div>
    )
  }
}
/*
const mapStateToProps = state => {
  console.log(state)
  return {
    Sidebar: state.Sidebar
  }
}

const mapDispatchToProps = (dispatch) => ({
    toggleSidebar: (isClosed) => dispatch(toggleSidebar(), isClosed),
})
*/
export default Dashboard
