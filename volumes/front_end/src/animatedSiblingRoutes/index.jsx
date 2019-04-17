import PropTypes from 'prop-types';
import React from 'react';
import { Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const LocationCache = () => {
  const cache = {};

  const addDepth = () => {
    cache[`element${Object.keys(cache).length + 1}`] = {
      pathname: '',
      key: '',
    };
  };

  const getKey = ({ location, depth }) => {
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

const locationCache = new LocationCache();

const AnimatedSiblingRoutes = ({
  children, location, depth,
}) => {
  const key = locationCache.getKey({
    location,
    depth,
  });

  return (
    <TransitionGroup>
      <CSSTransition key={key} classNames="fade" timeout={300}>
        <Switch location={location}>
          {children}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimatedSiblingRoutes;

AnimatedSiblingRoutes.defaultProps = {
  children: (
    <React.Fragment />
  ),
};

AnimatedSiblingRoutes.propTypes = {
  depth: PropTypes.number.isRequired,
  children: PropTypes.node,
  location: PropTypes.shape({
    key: PropTypes.string,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
