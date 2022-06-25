import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  // handleNumberChanged = (event) => {
  //   const value = event.target.value;
  //   if (!isNaN(value) && value >= 1 && value <= 32) {
  //     this.setState({ numberOfEvents: value });
  //   }
  //   this.props.updateEvents(undefined, value);
  // };

  handleNumberChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({ numberOfEvents: value });

    if (value < 1) {
      this.setState({
        infoText: 'Select number from 1 to 32',
      });
    } else {
      this.setState({
        infoText: '',
      });
    }
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
        <ErrorAlert text={this.state.ErrorText} />
      </div>
    );
  }
}
export default NumberOfEvents;
