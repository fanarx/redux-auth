import React, { Component, PropTypes } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { createEvent } from '../../actions/eventActions';
import { connect } from 'react-redux';


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


  onSubmit(e) {
    e.preventDefault();
    this.props.createEvent({event: this.state.title, token: localStorage.getItem('jwtToken')});
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

        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

EventForm.propTypes = {
  createEvent: PropTypes.func.isRequired
}

// EventForm.contextTypes = {
//   router: PropTypes.object.isRequired
// }

export default connect(null, { createEvent })(EventForm);