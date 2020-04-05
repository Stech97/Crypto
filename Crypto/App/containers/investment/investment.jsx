import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import { getInvestments, deleteInvestment } from './investmentActions.jsx'
import Investments from '../../components/Investments.jsx'

class Investment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: location.search };
        this.deleteInvestment = this.deleteInvestment.bind(this);
    }

    componentDidMount() {
        this.props.getInvestments(0);
    }

    deleteInvestment(investmentId) {
        let pageIndex;
        const parsed = queryString.parse(location.search);
        if (parsed) {
            pageIndex = parsed['pageIndex'];
        }
        this.props.deleteInvestment(investmentId, pageIndex)
    }

    getInvestments() {
        let pageIndex;
        const parsed = queryString.parse(location.search);
        if (parsed) {
            pageIndex = parsed['pageIndex'];
        }
        this.props.getInvestments(pageIndex);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.query != location.search) {
            this.setState({ query: location.search });
            this.getInvestments();
        }
    }

    render() {
        const total = this.props.investment.totalPages;
        const pageSize = this.props.investment.pageSize;
        const pageNumbers = [];
        let queryTrailer = '';
        for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number}>
                    <Link className="link" to={"/investPage?pageIndex=" + (number - 1) + queryTrailer}>{number}</Link>
                </li>
            );
        });

        let investments = this.props.investment.records.map(item => {
            return (
                <Investments key={item.investmentId} data={item} isFull={false} isLogged={this.props.isLogged} deleteInvestment={this.deleteInvestment} />
            );
        });

        return (
            <div id="investments">
                <div id="investment">
                    {investments}
                    <div>
                        <ul className="pagingNumber">
                            {renderPageNumbers}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

let mapProps = (state) => {
    return {
        investment: state.investment.data,
        error: state.investment.error
    }
}

let mapDispatch = (dispatch) => {
    return {
        getInvestments: bindActionCreators(getInvestments, dispatch),
        deleteInvestment: bindActionCreators(deleteInvestment, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(Investment) 