import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ErrorPage from '../errorPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    const hasError = !!error;
    return {
      hasError,
    };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    const { hasError = false } = this.state;
    const { children = null } = this.props;

    if (hasError) {
      return <ErrorPage />;
    }

    return children;
  }
}

export default ErrorBoundary;

ErrorBoundary.defaultProps = {
  children: null,
};

ErrorBoundary.propTypes = {
  children: PropTypes.element,
};
