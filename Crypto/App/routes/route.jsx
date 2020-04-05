import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import Blog from '../containers/blog/blog.jsx';
import About from '../containers/about/about.jsx';
import Comments from '../containers/comments/comments.jsx';
import NewPost from '../containers/newPost/newPost.jsx';
import Investment from '../containers/investment/investment.jsx'
import Investments from '../components/Investments.jsx'

export default class Routing extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/blog/new" component={NewPost} />
                    <Route path="/blog/post" component={Comments} />
                    <Route path="/blog" component={Blog} />
                    <Route path="/investment" component={Investment} />
                    <Route path="/investment/invest" component={Investments} />
                    <Route exact path="/" render={() => (<Redirect to="/blog" />)} />
                </Switch>
            </main>
        );
    }
};
