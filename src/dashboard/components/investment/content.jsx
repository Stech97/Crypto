import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import Profit from "./Profit";
import Goods from "./Goods";
import Details from "./Details";
import InvestmentTable from "./InvestmentTable";
import InvestPopupForm from "./InvestForm";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const InvestPopup = (props) => {
  return (
    <div className={props.isOpened ? "popup" : "none"}>
      <div onClick={() => props.closeModal()} className="popup-layer"></div>
      <div className="popup-wrapper">
        <div className="popup-wrapper-header">
          <h1>{"Buy Product " + props.type}</h1>
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
    <Container maxWidth="lg">
      <Helmet>
        <title>Investment</title>
      </Helmet>
      <Goods />
      <Details />
      <Profit />
      <InvestmentTable />
    </Container>
  );
}

export default InvestmentContent;
