import React, { Component, Fragment } from 'react';
//import "../styles/style.scss";
import Header from './components/Header';
import Homescreen from './components/Homescreen_new';
import Ourmission from './components/Ourmission_new';
import Howitworks from './components/Howitworks';
import Portfolio from './components/Portfolio';
import Career from './components/Career';
import DefimaToken from './components/Defimatoken';
import Ourteam from './components/Ourteam';
import Joinus from './components/Joinus';
import Faq from './components/Faq';
import Feedback from './components/Feedback';
import Footer from './components/Footer';

class MainPage extends Component {
  render() {
    return (
      <Fragment>
        <svg className="none">
          <symbol id="linkedin">
            <path d="M34.963 35.536h-5.93V26.25c0-2.214-.044-5.063-3.08-5.063-3.089 0-3.562 2.411-3.562 4.902v9.447h-5.928v-19.09h5.687v2.608h.08c.795-1.5 2.733-3.08 5.616-3.08 6 0 7.117 3.955 7.117 9.097zM9.775 13.839a3.439 3.439 0 01-3.437-3.437 3.439 3.439 0 013.437-3.438 3.445 3.445 0 013.438 3.438 3.433 3.433 0 01-3.438 3.437zM6.811 35.536v-19.09h5.937v19.09zM37.793 1.25H3.498C1.927 1.25.65 2.545.65 4.134v34.232c0 1.59 1.277 2.884 2.848 2.884h34.295c1.571 0 2.857-1.295 2.857-2.884V4.134c0-1.59-1.286-2.884-2.857-2.884z"></path>
            <path
              fill="none"
              strokeMiterlimit="20"
              d="M34.963 35.536h-5.93V26.25c0-2.214-.044-5.063-3.08-5.063-3.089 0-3.562 2.411-3.562 4.902v9.447h-5.928v-19.09h5.687v2.608h.08c.795-1.5 2.733-3.08 5.616-3.08 6 0 7.117 3.955 7.117 9.097zM9.775 13.839a3.439 3.439 0 01-3.437-3.437 3.439 3.439 0 013.437-3.438 3.445 3.445 0 013.438 3.438 3.433 3.433 0 01-3.438 3.437zM6.811 35.536v-19.09h5.937v19.09zM37.793 1.25H3.498C1.927 1.25.65 2.545.65 4.134v34.232c0 1.59 1.277 2.884 2.848 2.884h34.295c1.571 0 2.857-1.295 2.857-2.884V4.134c0-1.59-1.286-2.884-2.857-2.884z"
            ></path>
          </symbol>
        </svg>
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
    );
  }
}

export default MainPage;
