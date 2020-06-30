import React, { Component, Fragment } from "react";
import "../styles/tech.scss";
import TermsAndConditions from "./terms";
import Footer from "../main/components/Footer";
import Header from "./Header.jsx";

class TechPage extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <section className="content">
          <TermsAndConditions />
        </section>
        <Footer />
      </Fragment>
    );
  }
}

export default TechPage;
