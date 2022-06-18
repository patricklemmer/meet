import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  render() {
    return (
      <div>
        <input
          type="text"
          id="events-number"
          value={this.state.numberOfEvents}
        ></input>
      </div>
    );
  }
}
export default NumberOfEvents;
