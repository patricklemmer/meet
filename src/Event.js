import React, { Component } from 'react';

class Event extends Component {
  state = {
    collapsed: true,
  };

  newDateFormat = (eventDate) => {
    const newDate = `${new Date(eventDate)}`;
    return newDate;
  };

  handleClick = () => {
    this.state.collapsed
      ? this.setState({ collapsed: false })
      : this.setState({ collapsed: true });
  };

  adjustButtonText = () => {
    if (this.state.collapsed === true) {
      return 'Show details';
    } else {
      return 'Hide details';
    }
  };

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <h3 className="title">{event.summary}</h3>
        <p className="start-time">{this.newDateFormat(event.start.dateTime)}</p>
        <p className="location">{event.location}</p>
        {!this.state.collapsed && (
          <p className="details">{event.description}</p>
        )}
        <button className="details-btn" onClick={this.handleClick}>
          {this.adjustButtonText()}
        </button>
      </div>
    );
  }
}
export default Event;
