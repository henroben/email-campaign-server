import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        console.log(this.props.auth);
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
                        <li>Logged in</li>
                    </ul>
                );
        }
    }
    render() {
        return(
            <nav>
                <div className="nav-wrapper">
                    <a href="/" className="left brand-logo">Email Campaign Server</a>
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