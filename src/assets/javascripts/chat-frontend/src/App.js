import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VisibleChat from "./bundles/containers/Chat";

class App extends Component {
  render() {
    return (
      <VisibleChat />
    );
  }
}

export default App;
