import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Investment extends React.Component {

    render() {

        let investmentBlock;
        if (!this.props.isFull) {
            commentBlock =
                <Link className="link" to={"/investment/invest?invesmentId=" + this.props.data.investmentId}>Комментарии {this.props.data.investmentCount}</Link>;
        }

        let deleteBlock;
        if (this.props.isLogged) {
            deleteBlock =
                <a className="link" onClick={() => {
                    if (confirm('Вы уверены что хотите удалить запись?')) {
                        this.props.deleteInvestment(this.props.data.investmentId);
                    }
                }}>Удалить запись</a>;
        }

        return (
            <div className="invest">
                <div className="header">
                    <Link className="link" to={"/investment/invest?invesmentId=" + this.props.data.investmentId}>{this.props.data.header}</Link>
                </div>
                <div className="content">
                    <div>
                        {this.props.data.body}
                    </div>
                    <div className="footer">
                        <div className="actionBlock">
                            <div className="deleteBlock">
                                {deleteBlock}
                            </div>
                            <div className="investmentssBlock">
                                {investmentBlock}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};