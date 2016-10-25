import React, { Component, PropTypes } from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userLoginRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends Component {

    render() {
        const { userLoginRequest, addFlashMessage } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <SignupForm 
                            userLoginRequest={userLoginRequest}
                            addFlashMessage={addFlashMessage}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    userLoginRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { userLoginRequest, addFlashMessage })(SignupPage);