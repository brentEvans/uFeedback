import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions/index';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys(surveys) {
        if (!surveys) {
            return (
                <div className="center-align">
                    <h4>You haven't created any Surveys!</h4>
                    <h5>Click the + button to get started</h5>
                </div>
            );
        }
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card blue-grey darken-1"key={survey._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
                        <div className="card-action">
                            <a>Yes: {survey.yes}</a>
                            <a>No: {survey.no}</a>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
} 

const mapStateToProps = ({ surveys }) => {
    return { surveys };
}

export default connect(
    mapStateToProps,
    { fetchSurveys }
)(SurveyList)