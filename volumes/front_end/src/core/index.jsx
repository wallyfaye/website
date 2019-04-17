import PropTypes from 'prop-types';
import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Redirect,
} from 'react-router-dom';

import AnimatedSiblingRoutes from '../animatedSiblingRoutes';

/**
 * @param {Object} [param] - this is object param.
 * @param {number} [param.siteName=Website] - this is siteName param.
 */
const Core = ({ siteName }) => (
  <Router>
    <Route
      render={({ location: location1 }) => (
        <React.Fragment>
          <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/topics">Topics</NavLink>
            <NavLink to="/other">Other</NavLink>
          </nav>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <AnimatedSiblingRoutes location={location1} depth={1}>
            <Route path="/home" render={() => <h2>Home</h2>} />
            <Route path="/about" render={() => <h2>About</h2>} />
            <Route
              path="/topics"
              render={({ match: match2, location: location2 }) => (
                <React.Fragment>
                  <h2>Topics</h2>

                  <nav>
                    <NavLink to={`${match2.url}/components`}>Components</NavLink>
                    <NavLink to={`${match2.url}/props-v-state`}>Props v. State</NavLink>
                  </nav>

                  <AnimatedSiblingRoutes location={location2} depth={2}>
                    <Route path={`${match2.url}/components`} render={() => <h2>Components Page</h2>} />
                    <Route
                      path={`${match2.path}/:id`}
                      render={({ match: match3, location: location3 }) => (
                        <React.Fragment>
                          <h2>Props vs State</h2>

                          <nav>
                            <NavLink to={`${match3.url}/props`}>Props</NavLink>
                            <NavLink to={`${match3.url}/state`}>State</NavLink>
                          </nav>

                          <AnimatedSiblingRoutes location={location3} depth={3}>
                            <Route
                              path={`${match3.path}/:id`}
                              render={({ match: match4 }) => (
                                <h3>{match4.params.id}</h3>
                              )}
                            />
                            <Route
                              exact
                              path={match3.path}
                              render={() => <h3>Props or State?</h3>}
                            />
                          </AnimatedSiblingRoutes>

                        </React.Fragment>
                      )}
                    />
                    <Route
                      exact
                      path={match2.path}
                      render={() => <h3>Please select a topic.</h3>}
                    />
                  </AnimatedSiblingRoutes>

                </React.Fragment>
              )}
            />
            <Route render={() => <h2>Not Found</h2>} />
          </AnimatedSiblingRoutes>
          <footer>
            <p>{siteName}</p>
          </footer>
        </React.Fragment>
      )}
    />
  </Router>
);

export default Core;

Core.defaultProps = {
  siteName: 'Website',
};

Core.propTypes = {
  siteName: PropTypes.string,
};
