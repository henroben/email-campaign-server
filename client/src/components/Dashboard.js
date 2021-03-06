import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
    return (
        <div style={{marginBottom: '75px'}}>
            <SurveyList />
            <div style={{float:'right', bottom: '0px', display: 'block'}}>
                <Link to="/surveys/new" className="btn-floating btn-large red">
                    <i className="large material-icons">add</i>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;