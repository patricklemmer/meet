import React, { Component } from 'react';

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
        <label htmlFor="events-number">Number of Events</label>
        <br />
        <input
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
