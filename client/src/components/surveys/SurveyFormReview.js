import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';

import * as actions from '../../actions';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return(
        <div style={{ marginTop: '15px', marginBottom: '70px' }}>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="aves-effect waves-light btn left" onClick={onCancel}>
                <i className="material-icons left">arrow_back</i>
                Back
            </button>
            <button className="aves-effect waves-light green btn right" onClick={() => submitSurvey(formValues, history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));