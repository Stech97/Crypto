import React, { Component, Fragment } from 'react'
import '../styles/style.scss'
import Header from './components/Header'
import Homescreen from './components/Homescreen'
import Ourmission from './components/Ourmission'
import Howitworks from './components/Howitworks'
import Portfolio from './components/Portfolio'
import Career from './components/Career'
import DefimaToken from './components/Defimatoken'
import Ourteam from './components/Ourteam'
import Joinus from './components/Joinus'
import Faq from './components/Faq'
import Feedback from './components/Feedback'
import Footer from './components/Footer'

class MainPage extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Homescreen />
        <Ourmission />
        <Howitworks />
        <Portfolio /> 
        <Career />
        <DefimaToken />
        <Ourteam />
        <Joinus />
        <Faq />
        <Feedback />
        <Footer />
      </Fragment>
    )
  }
}

export default MainPage
