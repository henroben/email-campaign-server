import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }
    renderSurveys(surveys) {
        return surveys.reverse().map(survey => {
            return (
                <div className="card blue-grey darken-1" key={survey._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent on: {new Date(survey.dateSent).toLocaleDateString()} | Last responded: {new Date(survey.lastResponded).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="#">Yes: {survey.yes}</a>
                        <a href="#">No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }
    render() {
        return(
            <div>
                {this.renderSurveys(this.props.surveys)}
            </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    return {
        surveys
    }
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);