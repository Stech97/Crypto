import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Investments extends React.Component {

    render() {

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
                    {this.props.data.name}
                </div>
                <div className="content">
                    <div>
                        {this.props.data.description}
                        <p></p>
                        {this.props.data.profit}
                    </div>
                    <div className="footer">
                        <div className="actionBlock">
                            <div className="deleteBlock">
                                {deleteBlock}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};