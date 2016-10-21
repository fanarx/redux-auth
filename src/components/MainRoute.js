import React from 'react';
import { BrowserRouter as Router, Match } from 'react-router';
import App from './App';

export default () => {
    return (
        <div>
            <Router>
                <div>
                    <Match exactly pattern="/" component={App} />
                    {/*<Match pattern="/signup" component={SignupPage} />*/}
                </div>
            </Router>
        </div>
    );
}