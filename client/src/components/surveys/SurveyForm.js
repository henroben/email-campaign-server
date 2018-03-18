import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import validateEmails from '../../utils/validateEmails';
import SurveyField from './SurveyField';
import formFields from './formFields';

class SurveyForm extends Component {
	renderFields() {
		return formFields.map(({ label, name }) => {
			return (
				<Field
					label={label}
					type="text"
					name={name}
					component={SurveyField}
					key={name}
				/>
			);
		});
	}
	render() {
		return (
			<div style={{ marginTop: '15px', marginBottom: '70px' }}>
				<form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
					{this.renderFields()}
					<Link to={'/surveys'} className="aves-effect waves-light btn left">
						<i className="material-icons left">cancel</i>
						Cancel
					</Link>
					<button className="aves-effect waves-light btn right" type="submit">
						Next
						<i className="material-icons right">done</i>
					</button>
				</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.emails = validateEmails(values.recipients || '');

	_.each(formFields, ({ name, noValueError }) => {
		if(!values[name]) {
			errors[name] = noValueError;
		}
	});

	return errors; // if errors object empty, fields are all valid
}

export default reduxForm({
	validate,
	form: 'surveyForm',
	destroyOnUnmount: false
})(SurveyForm);
