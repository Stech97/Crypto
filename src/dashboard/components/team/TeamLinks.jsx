import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getRefs } from "../../actions/getRefs";
import Loader from "react-loader-spinner";

class TeamLinks extends Component {
  componentDidMount = () => {
    this.props.getRefsAction();
  };

  render() {
    const { Refs } = this.props;
    return (
      <div className="team-ref team-whitebox">
        <div className="team-ref-id">
          <h6>
            {Refs.isFetching ? (
              <Loader type="Rings" color="#123273" height={80} width={80} />
            ) : (
              "REF LINK " + Refs.refs.refId
            )}
          </h6>
        </div>
        <div className="team-ref-username">
          <h6>
            {Refs.isFetching ? (
              <Loader type="Rings" color="#123273" height={80} width={80} />
            ) : (
              "REF LINK " + Refs.refs.refString
            )}
          </h6>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    Refs: store.Refs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRefsAction: () => dispatch(getRefs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamLinks);
