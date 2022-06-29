import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class IntroBox extends Component {
  render() {
    return (
      <Alert variant="dark" className="IntroBox">
        <h1 className="title">Welcome to meet!</h1>
        <h5 className="sub-title">
          The easiest way to meet people from the tech community.
        </h5>
        <p className="intro-text">
          Start by typing the name of the city nearest to you. If you feel like
          travelling just click inside the textbox to receive a list of cities
          around the globe with upcoming events. You can also limit the results
          by changing the number below.{' '}
        </p>
        <p>
          If you`re curious how this app works behind the scenes, follow&nbsp;
          <Alert.Link
            href="https://github.com/patricklemmer/meet"
            target="_blank"
          >
            this link
          </Alert.Link>
          &nbsp;to view this app`s GitHub repo.
        </p>
      </Alert>
    );
  }
}

export default IntroBox;