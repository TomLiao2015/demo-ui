import React, { Component } from 'react';
import './assets/App.css';
import fetch from './util/fetch';

class App extends Component {
  render() {
      const init = {
          method: 'get'
      };
      fetch('/demo/transactions', init);
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
