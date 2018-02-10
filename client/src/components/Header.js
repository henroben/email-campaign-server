import React, { Component } from 'react';

class Header extends Component {
    render() {
        return(
            <nav>
                <div className="nav-wrapper">
                    <a href="/" className="left brand-logo">Email Campaign Server</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/auth/facebook">Sign in with Facebook</a></li>
                        <li><a href="/auth/google">Sign in with Google</a></li>
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        <li><a href="/auth/facebook">Sign in with Facebook</a></li>
                        <li><a href="/auth/google">Sign in with Google</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;