import React from 'react';
import logo from './logo.png'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Launches from './components/Launches';
import Launch from './components/Launch';
import './App.css';

const client = new ApolloClient({
  uri: '/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <img src={logo} alt="SpaceX"
          style={{ width: 300, display: 'block', margin: 'auto' }} />
        <Router>
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
