import React, { Component } from 'react'
import './styles/style.scss'
import waveimage from './styles/utils/img/waveimage.png'
import stealthlogo from './styles/utils/img/stealth-logo.png'
import worldmap2 from './styles/utils/img/worldmap2.png'
import joinusbackground from './styles/utils/img/joinus.png'
import Header from './components/Header.js'
import Homescreen from './components/Homescreen.js'
import Ourmission from './components/Ourmission.js'
import Howitworks from './components/Howitworks.js'
import Portfolio from './components/Portfolio.js'
import Career from './components/Career.js'
import DefimaToken from './components/Defimatoken.js'
import Ourteam from './components/Ourteam.js'
import Joinus from './components/Joinus.js'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Homescreen />
        <Ourmission />
        <Howitworks />
        <Portfolio />
        <Career />
        <DefimaToken />
        <Ourteam />
        <Joinus />
      </React.Fragment>
    )
  }
}

export default App

/*
        <Faq />
        <Feedback />
        <Footer />
*/