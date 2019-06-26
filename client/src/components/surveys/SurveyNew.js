// SurveyNew shows SurveyForm and SurveyFormReview

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = { showFormReview: false };

    render() {
        let createSurvey;

        this.state.showFormReview
            ? createSurvey = (
                <div className="createsurveyform">
                    <SurveyFormReview onCancel={() => this.setState({ showFormReview: false })} />
                </div>
            )
            : createSurvey = (
                <div className="createsurveyform">
                    <SurveyForm
                        onSurveySubmit={() => this.setState({ showFormReview: true })}
                    />
                </div>
            )
        return (
            <>
                <main className="dashboard">
                    <div className="opacity">
                        {createSurvey}
                    </div>
                </main>
            </>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);