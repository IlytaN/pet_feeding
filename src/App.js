import React from 'react';
import logo from './golden.jpg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      feedback: ''
    };
    this.feed = this.feed.bind(this);
  };

  feed = () => {
    axios.get('http://192.168.1.110/feed')
    .then(response => this.setState({feedback: response.data}));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="name">
            My Dog
          </h2>
          <p className="alert alert-success">{this.state.feedback}</p>
          <img src={logo} className="App-logo" alt="logo" />
          <button type="button" className="btn btn-lg btn-feed my-3" onClick={this.feed}>
            Feed Now
          </button>
          <button type="button" className="btn btn-lg btn-outline-feed">
            Schedule
          </button>
        </header>
      </div>
    );
  }
}

export default App;
