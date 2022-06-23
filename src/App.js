import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      this.setState({ locations: extractLocations(events) });
      this.setState({ events: events.slice(0, this.state.numberOfEvents) });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (!location) location = 'all';
    !eventCount
      ? (eventCount = this.state.numberOfEvents)
      : this.setState({ numberOfEvents: eventCount });
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, eventCount),
      });
    });
  };

  render() {
    return (
      <Container fluid className="App">
        <Form>
          <Row>
            <Col lg={8} className="mb-5">
              <CitySearch
                locations={this.state.locations}
                updateEvents={this.updateEvents}
              />
            </Col>
            <Col className="mb-5">
              <NumberOfEvents
                numberOfEvents={this.state.numberOfEvents}
                updateEvents={this.updateEvents}
              />
            </Col>
          </Row>
        </Form>
        <Col md={8} className="mx-auto">
          <EventList events={this.state.events} />
        </Col>
      </Container>
    );
  }
}

export default App;
