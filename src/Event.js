import React, { Component } from 'react';

class Event extends Component {
  state = {
    collapsed: true,
  };

  newDateFormat = (eventDate) => {
    const newDate = `${new Date(eventDate)}`;
    return newDate;
  };

  render() {
    const { event } = this.props;

    return (
      <div className="event">
        <p className="start-time">{this.newDateFormat(event.start.dateTime)}</p>
        <h3 className="title">{event.summary}</h3>
        <p className="location">{event.location}</p>
        <button className="details-btn"></button>
      </div>
    );
  }
}
export default Event;
