import React from 'react';

const Footer = () => {
    return(
        <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Email Campaign Server</h5>
                        <p className="grey-text text-lighten-4">Collect feedback from your users.</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                            <li><a className="grey-text text-lighten-3" href="https://github.com/henroben/email-campaign-server">Github Repository</a></li>
                            {/*<li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>*/}
                            {/*<li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>*/}
                            {/*<li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>*/}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    © 2018 Benjamin Mercer
                    <a className="grey-text text-lighten-4 right" href="http://www.henroben.co.uk">henroben.co.uk</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;