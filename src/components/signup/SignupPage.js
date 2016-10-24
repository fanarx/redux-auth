import React, {Component} from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userLoginRequest } from '../../actions/signupActions';

class SignupPage extends Component {

    render() {
        const { userLoginRequest } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <SignupForm userLoginRequest={userLoginRequest}/>
                    </div>
                </div>
            </div>
        );
    }
}

SignupPage.propTypes = {
    userLoginRequest: React.PropTypes.func.isRequired
}

export default connect(null, {userLoginRequest})(SignupPage);