import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleNumberChanged = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 32) {
      this.setState({ numberOfEvents: value, ErrorText: '' });
    } else {
      this.setState({ ErrorText: 'Please select a number from 1 to 32.' });
    }
    this.props.updateEvents(undefined, value);
  };

  render() {
    return (
      <div className="numberOfEvents">
        <p>Show</p>
        <Form.Control
          type="text"
          id="events-number"
          min={1}
          max={this.state.numberOfEvents}
          defaultValue={this.state.numberOfEvents}
          onChange={this.handleNumberChanged}
        />
        <p>events</p>
        <ErrorAlert text={this.state.ErrorText} />
      </div>
    );
  }
}
export default NumberOfEvents;
