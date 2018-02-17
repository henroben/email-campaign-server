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
                return (
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/auth/facebook">Sign in with Facebook</a></li>
                        <li><a href="/auth/google">Sign in with Google</a></li>
                    </ul>
                );
            default:
                return(
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Payments/></li>
                        <li><a href="/api/logout">Sign out</a></li>
                    </ul>
                );
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
                    {this.renderContent()}
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