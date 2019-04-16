import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, NavLink,
} from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

/**
 * Shows a loading indicator
 */
const SiteRouter = () => (
  <Router>
    <Route
      render={({ location }) => (
        <React.Fragment>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/topics">Topics</NavLink>
            <NavLink to="/other">Other</NavLink>
          </nav>
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Switch location={location}>
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path="/home" render={() => <div>Home</div>} />
                <Route path="/about" render={() => <div>About</div>} />
                <Route path="/topics" render={() => <div>Topics</div>} />
                <Route render={() => <div>Not Found</div>} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </React.Fragment>
      )}
    />
  </Router>
);

export default SiteRouter;
