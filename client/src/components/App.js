import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Footer from './Footer';
import Dashboard from './Dashboard';

const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return(
            <div>
                <BrowserRouter>
                    <div className="">
                        <Header />
                        <div className="container" style={{minHeight: '200px'}}>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/surveys" component={Dashboard} />
                            <Route exact path="/surveys/new" component={SurveyNew} />
                        </div>
                        <Footer style={{bottom:'0px'}} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);