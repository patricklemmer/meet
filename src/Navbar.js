import React, { Component } from 'react';
import { Container, Navbar } from 'react-bootstrap';

class NavBar extends Component {
  render() {
    return (
      <>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand>Brand text</Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
