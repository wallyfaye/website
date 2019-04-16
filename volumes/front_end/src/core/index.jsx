import PropTypes from 'prop-types';
import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, NavLink,
} from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const LocationCache = function () {
  const cache = {};

  const addDepth = function () {
    cache[`element${Object.keys(cache).length + 1}`] = {
      pathname: '',
      key: '',
    };
  };

  const getKey = function ({ location, depth }) {
    if (cache[`element${depth}`] === undefined) {
      addDepth();
    }
    cache[`element${depth}`] = {
      pathname: location.pathname.split('/')[depth],
      key: (location.pathname.split('/')[depth] !== cache[`element${depth}`].pathname)
        ? location.key
        : cache[`element${depth}`].key,
    };
    return cache[`element${depth}`].key;
  };

  return {
    getKey,
  };
};

/**
 * @param {Object} [param] - this is object param.
 * @param {number} [param.siteName=Website] - this is siteName param.
 */
const Core = ({ siteName }) => {
  const lcache = new LocationCache();

  return (
    <Router>
      <Route
        render={({ location: location1 }) => {
          const key1 = lcache.getKey({
            location: location1,
            depth: 1,
          });

          return (
            <React.Fragment>
              <nav>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/topics">Topics</NavLink>
                <NavLink to="/other">Other</NavLink>
              </nav>
              <TransitionGroup>
                <CSSTransition key={key1} classNames="fade" timeout={300}>
                  <Switch location={location1}>
                    <Route exact path="/" render={() => <h2>Home</h2>} />
                    <Route path="/home" render={() => <h2>Home</h2>} />
                    <Route path="/about" render={() => <h2>About</h2>} />
                    <Route
                      path="/topics"
                      render={({ match: match2, location: location2 }) => {
                        const key2 = lcache.getKey({
                          location: location2,
                          depth: 2,
                        });

                        return (
                          <React.Fragment>
                            <h2>Topics</h2>

                            <nav>
                              <NavLink to={`${match2.url}/components`}>Components</NavLink>
                              <NavLink to={`${match2.url}/props-v-state`}>Props v. State</NavLink>
                            </nav>

                            <TransitionGroup>
                              <CSSTransition key={key2} classNames="fade" timeout={300}>
                                <Switch location={location2}>
                                  <Route
                                    path={`${match2.path}/:id`}
                                    render={({ match: match3, location: location3 }) => {
                                      const key3 = lcache.getKey({
                                        location: location3,
                                        depth: 3,
                                      });

                                      return (
                                        <React.Fragment>
                                          <h2>Next/Plus</h2>

                                          <nav>
                                            <NavLink to={`${match3.url}/depth-next`}>Next</NavLink>
                                            <NavLink to={`${match3.url}/depth-plus`}>Plus</NavLink>
                                          </nav>

                                          <TransitionGroup>
                                            <CSSTransition key={key3} classNames="fade" timeout={300}>
                                              <Switch location={location3}>
                                                <Route
                                                  path={`${match3.path}/:id`}
                                                  render={({ match: match4 }) => (
                                                    <h3>{match4.params.id}</h3>
                                                  )}
                                                />
                                                <Route
                                                  exact
                                                  path={match3.path}
                                                  render={() => <h3>Next or Plus?</h3>}
                                                />
                                              </Switch>
                                            </CSSTransition>
                                          </TransitionGroup>

                                        </React.Fragment>
                                      );
                                    }}
                                  />
                                  <Route
                                    exact
                                    path={match2.path}
                                    render={() => <h3>Please select a topic.</h3>}
                                  />
                                </Switch>
                              </CSSTransition>
                            </TransitionGroup>

                          </React.Fragment>
                        );
                      }}
                    />
                    <Route render={() => <h2>Not Found</h2>} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              <footer>
                <p>{siteName}</p>
              </footer>
            </React.Fragment>
          );
        }}
      />
    </Router>
  );
};

export default Core;

Core.defaultProps = {
  siteName: 'Website',
};

Core.propTypes = {
  siteName: PropTypes.string,
};
