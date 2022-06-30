// Imports
import React, { Component } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Component imports
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';

// Style imports
import './App.css';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: 'unedfined',
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    let isTokenValid;
    if (accessToken && !navigator.onLine) {
      isTokenValid = true;
    } else {
      isTokenValid = (await checkToken(accessToken)).error ? false : true;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        offlineText: "Your're offline! The data was loaded from the cache.",
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;

    return (
      <Container fluid className="App">
        <OfflineAlert className="offline_alert" text={this.state.offlineText} />
        <Form>
          <Row>
            <Col lg={8} className="mb-3">
              <CitySearch
                style={{
                  border: '3px solid teal',
                }}
                locations={this.state.locations}
                updateEvents={this.updateEvents}
              />
            </Col>
            <Col className="mb-3">
              <p>
                Show&nbsp;
                <NumberOfEvents
                  style={{
                    border: '3px solid green',
                  }}
                  numberOfEvents={this.state.numberOfEvents}
                  updateEvents={this.updateEvents}
                />
                &nbsp;events
              </p>
            </Col>
          </Row>
        </Form>
        <Row className="data-vis-wrapper">
          <EventGenre
            style={{
              border: '3px solid red',
            }}
            events={this.state.events}
          />
          <ResponsiveContainer
            className="recharts-responsive-container"
            height={400}
          >
            <ScatterChart
              style={{
                border: '3px solid blue',
              }}
              margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
            >
              <CartesianGrid stroke="#333" strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="City" stroke="#333" />
              <YAxis
                type="number"
                dataKey="number"
                name="Number of events"
                allowDecimals={false}
                stroke="#333"
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </Row>
        <Col md={8} className="mx-auto mb-3">
          <EventList
            style={{
              border: '3px solid white',
            }}
            events={this.state.events}
          />
        </Col>
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </Container>
    );
  }
}

export default App;
