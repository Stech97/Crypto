import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRefs } from '../../actions/getRefs';
import Loader from 'react-loader-spinner';

class ContentLinks extends Component {
  componentDidMount = () => {
    this.props.getRefsAction();
  };

  render() {
    const { Refs } = this.props;
    console.log(Refs);
    return (
      <div className="content-links content-text-blue">
        <div className="content-links-ref content-whitebox-links">
          <div className="refbyid">
            {Refs.isFetching ? (
              <Loader type="Rings" color="#123273" height={80} width={80} />
            ) : (
              'REF LINK ' + Refs.refs.refId
            )}
          </div>
          <div className="refbyusername">
            {Refs.isFetching ? (
              <Loader type="Rings" color="#123273" height={80} width={80} />
            ) : (
              'REF LINK ' + Refs.refs.refString
            )}
          </div>
        </div>
        <div className="content-links-links content-whitebox-links">
          <div className="presentation-link">Business Presentation PDF</div>
          <div className="image-video-link">Image Video</div>
          <div className="tutorial-link">
            <a href="telegram.org">Telegram Channel </a>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentLinks);
