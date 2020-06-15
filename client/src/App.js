import React from 'react';
import logo from './logo.png'
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Launches from './components/Launch/Launches';
import Launch from './components/Launch/Launch';
import Posts from './components/Post/Posts';
import Post from './components/Post/Post';
import Welcome from './components/Welcome';
import { NavLink } from 'reactstrap';
import AppNavbar from './components/AppNavbar';
import './App.scss';

const client = new ApolloClient({
  uri: '/graphql'
})
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <>
      <NavLink href="https://github.com/wiktorkujawa/" className="social-card" target={"_blank"}>
        <i className="fa fa-github fa-4x" aria-hidden="true"></i>
      </NavLink>
      <Route {...rest} component={(props) => (
        <div className="public-route">
          <AppNavbar />
          
          <Component {...props} />
          {/* <Footer /> */}
        </div>
      )}
      />
    </>
  )
}

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => (<Component {...props} />)}
    />
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <img src={logo} alt="SpaceX"
          style={{ width: 300, display: 'block', margin: 'auto' }} />
      
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={Welcome}/>
            <PublicRoute exact path="/posts/" component={Posts} />
            <PublicRoute exact path="/launches/" component={Launches} />
            <PublicRoute path="/posts/post/:_id" component={Post} />
            <PublicRoute path="/launches/launch/:flight_number" component={Launch} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
