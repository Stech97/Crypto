import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import Profit from "./Profit";
import Goods from "./Goods";
import Details from "./Details";
import InvestmentTable from "./InvestmentTable";
import InvestPopupForm from "./InvestForm";
import { Container } from '@material-ui/core';

class InvestmentDetails extends Component {
  state = {
    isOpened: true,
  };

  handleClick = () => {
    this.setState({ isOpened: !this.state.isOpened });
  };

  render() {
    return (
      <div className="investment-details">
        <div
          className={
            this.state.isOpened
              ? 'investment-details-panel'
              : 'investment-details-panel investment-details-panel-closed'
          }
        >
          <div className="investment-details-panel-header">
            <h5>Investment Details</h5>
          </div>
          <div className="investment-details-panel-arrow">
            <svg
              onClick={() => this.handleClick()}
              role="img"
              className={'arrow' + (this.state.isOpened ? '' : '-closed')}
              preserveAspectRatio="xMinYMin slice"
              viewBox="0 0 25 15"
            >
              <use href="#arrow-down" />
            </svg>
          </div>
        </div>
        <div
          className={
            this.state.isOpened ? 'investment-details-content' : 'none'
          }
        >
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
            magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
            justo duo dolores et ea rebum.
          </p>
        </div>
      </div>
    );
  }
}

const InvestPopup = (props) => {
  return (
    <div className={props.isOpened ? 'popup' : 'none'}>
      <div onClick={() => props.closeModal()} className="popup-layer"></div>
      <div className="popup-wrapper">
        <div className="popup-wrapper-header">
          <h1>{'Buy Product ' + props.type}</h1>
        </div>
        <div className="popup-wrapper-cross">
          <img
            onClick={() => props.closeModal()}
            src="/img/close-icon.png"
            alt="close-icon"
          />
        </div>
        <div className="popup-wrapper-content">
          <InvestPopupForm minamount={props.minamount} type={props.type} />
        </div>
      </div>
    </div>
  );
};

function InvestmentContent() {
  return (
    <Fragment>
      <Helmet>
        <title>Investment</title>
      </Helmet>
      <Container maxWidth="lg">
      <Goods />
      <Details />
      <Profit />
      <InvestmentTable />
      </Container>
    </Fragment>
  );
}

export default InvestmentContent;
