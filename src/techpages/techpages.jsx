import React, { Component, Fragment } from "react";
import "../styles/tech.scss";
import TermsAndConditionsContent from "./terms";
import Footer from "../main/components/Footer";
import Header from "./Header.jsx";

class TermsAndConditions extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <section className="content">
          <TermsAndConditionsContent />
        </section>
        <Footer />
      </Fragment>
    );
  }
}

export default TermsAndConditions;
