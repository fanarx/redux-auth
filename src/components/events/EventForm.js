import React, { Component, PropTypes } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { createEvent } from '../../actions/eventActions';
import { addFlashMessage } from '../../actions/flashMessages';
import { connect } from 'react-redux';
import validateEvent from '../../common/validations/event';

class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateEvent(this.state);

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
    this.props.createEvent({event: this.state.title, token: localStorage.getItem('jwtToken')})
        .then(res => this.props.addFlashMessage({
            type: 'success',
            text: 'Event is created'
        }))
        .then( () => console.log('second then') || this.setState({ isLoading: false }))
        .catch(errors => console.log('errors', errors) || this.setState({ errors, isLoading: false }))
  }

  onChange(e) {
    this.setState({ [e.target.name] : e.target.value });
  }
  
  render() {
    const { errors, title, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1>Create New Game Event</h1>

        <TextFieldGroup
          field="title"
          label="Title"
          value={title}
          error={errors.title}
          onChange={this.onChange}
        />

        <button disabled={isLoading} type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

// EventForm.contextTypes = {
//   router: PropTypes.object.isRequired
// }

export default connect(null, { createEvent, addFlashMessage })(EventForm);