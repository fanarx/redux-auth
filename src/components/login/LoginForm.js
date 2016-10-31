import React, { Component, PropTypes } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateUser from '../../common/validations/login';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateUser(this.state);

    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (!this.isValid()) {
      return
    }

    this.setState({ errors: {}, isLoading: true });
    this.props.login({ identifier: this.state.identifier, password: this.state.password })
      .then(res => console.log('res', res) || this.context.router.transitionTo('/'))
      .catch(errors => console.log('errors', errors) || this.setState({ errors, isLoading: false }))


  }

  onChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }
  
  render() {
    const { errors, identifier, password, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

        <TextFieldGroup
          field="identifier"
          label="Username"
          value={identifier}
          error={errors.identifier}
          onChange={this.onChange}
        />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={this.onChange}
          type="password"
        />

        <div className="form-group"><button className="btn btn-primary btn-lg" disabled={isLoading}>Login</button></div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);