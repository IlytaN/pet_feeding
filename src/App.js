import React from 'react';
import logo from './golden.jpg';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import DateTimePicker from 'react-datetime-picker';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      feedback: '',
      isShowingFeed: false,
      isShowingSchedule: false,
      date: new Date()
    };
    this.handleShowFeed = this.handleShowFeed.bind(this);
    this.handleCloseFeed = this.handleCloseFeed.bind(this);
    this.handleShowSchedule = this.handleShowSchedule.bind(this);
    this.handleCloseSchedule = this.handleCloseSchedule.bind(this);
  };
  
  handleShowFeed = () => {
      axios.get('http://192.168.1.110/feed')
      .then(response => this.setState({feedback: response.data, isShowingFeed: true}));
  }

  handleCloseFeed = () => {
      this.setState({
          isShowingFeed: false
      });
  }

  handleShowSchedule = () => {
      this.setState({
          isShowingSchedule: true
      });
  }

  handleCloseSchedule = () => {
      this.setState({
          isShowingSchedule: false
      });
  }

  changeDate = date => {
    this.setState({ date });
  }

  setSchedule = () => {
    axios.post('http://192.168.1.110/schedule', {time : this.state.date}).then(
      response => {
        this.handleCloseSchedule();
        this.setState({feedback: response.data, isShowingFeed: true})
      }
    );
  }

  render() {
    return (
      <Container className="App mt-4">
        <Row className="justify-content-center">
          <h2 className="text-info">
            My Dog
          </h2>
        </Row>
        <Row className="justify-content-center">
          <Col sm={6}>
            <Image src={logo} thumbnail></Image>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Button variant="info" size="lg" onClick={this.handleShowFeed} className="my-3 mx-2">
            Feed now
          </Button>
          <Button variant="outline-info" size="lg" onClick={this.handleShowSchedule} className="my-3 mx-2">
            Schedule
          </Button>
        </Row>

        {/* Show success action */}
        <Modal show={this.state.isShowingFeed} onHide={this.handleCloseFeed}>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.feedback}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseFeed}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Show time picker */}
        <Modal show={this.state.isShowingSchedule} onHide={this.handleCloseSchedule}>
          <Modal.Header closeButton>
            <Modal.Title>Schedule next feed</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DateTimePicker
              onChange={this.changeDate}
              value={this.state.date}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseSchedule}>
              Close
            </Button>
            <Button variant="primary" onClick={this.setSchedule}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default App;
