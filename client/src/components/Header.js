import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return null;
            case false:
                return [
                    <li key="0"><a href="/auth/facebook">Sign in with Facebook</a></li>,
                    <li key="1"><a href="/auth/google">Sign in with Google</a></li>
                ];
            default:
                return [
                    <li key="0"><Payments/></li>,
                    <li key="1" style={{ margin: '0 10px' }}>Credits: {this.props.auth.credits}</li>,
                    <li key="2"><a href="/api/logout">Sign out</a></li>
                ];
        }
    }
    render() {
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                        style={{ marginLeft: '10px'}}
                    >
                        Email Campaign Server
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ auth }) {
    return {
        auth
    };
}

export default connect(mapStateToProps)(Header);