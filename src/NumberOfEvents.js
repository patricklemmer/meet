import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleNumberChanged = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 1 && value <= 32) {
      this.setState({ numberOfEvents: value });
    }
    this.props.updateEvents(undefined, value);
  };

  render() {
    return (
      <div className="numberOfEvents">
        <Form.Control
          type="text"
          id="events-number"
          min={1}
          max={this.state.numberOfEvents}
          defaultValue={this.state.numberOfEvents}
          onChange={this.handleNumberChanged}
        />
      </div>
    );
  }
}
export default NumberOfEvents;
