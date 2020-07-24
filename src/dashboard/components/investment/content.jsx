import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import Profit from "./Profit";
import Goods from "./Goods";
import Details from "./Details";
import InvestmentTable from "./InvestmentTable";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
