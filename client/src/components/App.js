import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render(){
        return (
            <React.Fragment>
                <BrowserRouter>
                    <React.Fragment>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <div class="container">
                            <Route exact path="/surveys" component={Dashboard} />
                            <Route exact path="/surveys/new" component={SurveyNew} />
                        </div>
                    </React.Fragment>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default connect(
    null,
    actions
)(App);
