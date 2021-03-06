import React, { Component, PropTypes } from 'react';
//import { Match, Redirect } from 'react-router';
import validateUser from '../../common/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';
import { userSigninRequest, isUserExists } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';
import { connect } from 'react-redux';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;
        if (val !== "") {
            this.props.isUserExists(val).then(user => {
                let errors = this.state.errors;
                let invalid;
                if (user) {
                    errors[field] = `There is user with such ${field}`;
                    invalid = true;
                } else {
                    errors[field] = '';
                    invalid = false;
                }
                this.setState({ errors, invalid });
                console.log('isUserExists', user);
            });
        }
    }

    isValid() {
        const { errors, isValid } = validateUser(this.state);

        if (!isValid) {
            this.setState({ errors })
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (!this.isValid()) {
            return;
        }

        this.setState({ errors: {}, isLoading: true });
        this.props.userSigninRequest({ username: this.state.username, password: this.state.password })
            .then((user) => {
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'You signed up successfully. Welcome!'
                });
                this.context.router.transitionTo('/');
            })
            .catch(data => this.setState({ errors: data, isLoading: false }))

    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our community!</h1>
                <TextFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.username}
                    field="username"
                />

                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                />

                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
                        Sign up
                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.propTypes = {
    userSigninRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExists: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: PropTypes.object
}

export default connect(null, { userSigninRequest, addFlashMessage, isUserExists })(SignupForm);