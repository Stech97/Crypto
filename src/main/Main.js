import React, { Component, Fragment } from 'react'
import '../styles/style.scss'
import Header from './components/Header.js'
import Homescreen from './components/Homescreen.js'
import Ourmission from './components/Ourmission.js'
import Howitworks from './components/Howitworks.js'
import Portfolio from './components/Portfolio.js'
import Career from './components/Career.js'
import DefimaToken from './components/Defimatoken.js'
import Ourteam from './components/Ourteam.js'
import Joinus from './components/Joinus.js'
import Faq from './components/Faq.js'
import Feedback from './components/Feedback.js'
import Footer from './components/Footer.js'

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

/*
        <Faq />


*/