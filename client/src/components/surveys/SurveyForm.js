import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import SurveyField from './SurveyField';

const FIELDS = [
	{ label: 'Survey Title', name: 'title', noValueError: 'Please enter a Survey Title.' },
	{ label: 'Subject Line', name: 'subject', noValueError: 'Please enter an Email Subject.' },
	{ label: 'Email Body', name: 'body', noValueError: 'Please enter an Email Message' },
	{ label: 'Recipients List', name: 'emails', noValueError: 'Please enter at least one Email Address.' }
];

class SurveyForm extends Component {
	renderFields() {
		return FIELDS.map(({ label, name }) => {
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
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

	_.each(FIELDS, ({ name, noValueError }) => {
		if(!values[name]) {
			errors[name] = noValueError;
		}
	});

	return errors; // if errors object empty, fields are all valid
}

export default reduxForm({
	validate,
	form: 'surveyForm'
})(SurveyForm);
