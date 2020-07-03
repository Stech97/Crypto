import React, { Component } from "react";
import { Helmet } from "react-helmet";
import InvestmentProfit from "./investmentProfit";
import InvestPopupForm from "./InvestForm";
import InvestmentTable from "./InvestmentTable";

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
              ? "investment-details-panel"
              : "investment-details-panel investment-details-panel-closed"
          }
        >
          <div className="investment-details-panel-header">
            <h5>Investment Details</h5>
          </div>
          <div className="investment-details-panel-arrow">
            <svg
              onClick={() => this.handleClick()}
              role="img"
              className={"arrow" + (this.state.isOpened ? "" : "-closed")}
              preserveAspectRatio="xMinYMin slice"
              viewBox="0 0 25 15"
            >
              <use href="#arrow-down" />
            </svg>
          </div>
        </div>
        <div
          className={
            this.state.isOpened ? "investment-details-content" : "none"
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

class InvestmentGood extends Component {
  state = {
    isOpened: false,
  };

  toggleModal = () => {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  };

  render() {
    const {
      good: { name, percent, invest, levels },
    } = this.props;

    return (
      <div className="investment-goods-box">
        <div className="investment-goods-box-header">
          <h4>{name}</h4>
        </div>
        <div className="investment-goods-box-content">
          <p>{"Monthly Profit of up to " + percent + "% month"}</p>
          <p>{"Starting from $" + invest}</p>
          <p>{"Career commission qualified Level 1-" + levels}</p>
        </div>
        <div
          onClick={() => this.toggleModal()}
          className="investment-goods-box-button"
        >
          Invest
        </div>
        <InvestPopup
          closeModal={() => this.toggleModal()}
          isOpened={this.state.isOpened}
          type={name}
          minamount={invest}
        />
      </div>
    );
  }
}

class InvestmentGoods extends Component {
  render() {
    const goods = [
      {
        name: "Small",
        percent: 6,
        invest: 100,
        levels: 2,
      },
      {
        name: "Medium",
        percent: 8,
        invest: 5000,
        levels: 4,
      },
      {
        name: "Large",
        percent: 11,
        invest: 10000,
        levels: 7,
      },
    ];

    return (
      <div className="investment-goods">
        {goods.map((good, i) => (
          <InvestmentGood key={i} good={good} />
        ))}
      </div>
    );
  }
}

class InvestmentContent extends Component {
  render() {
    return (
      <div className="investment-box">
        <Helmet>
          <title>Investment</title>
        </Helmet>
        <InvestmentGoods />
        <InvestmentDetails />
        <InvestmentProfit />
        <InvestmentTable />
      </div>
    );
  }
}

export default InvestmentContent;
