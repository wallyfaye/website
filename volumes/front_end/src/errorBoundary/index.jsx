import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ErrorPage from '../errorPage';

/**
 * ErrorBoundary catches errors, shows ErrorPage and logs the error.
 */
class ErrorBoundary extends Component {
  
  /**
   * @param {object} props - properties.
   */
  constructor(props) {
    super(props);

    /**
     * @type {object}
     * @property {boolean} hasError if an error has been encountered
     */
    this.state = { hasError: false };
  }

  /**
   * @param {Error} error - an error object.
   */
  static getDerivedStateFromError(error) {
    const hasError = !!error;
    return {
      hasError,
    };
  }

  /**
   * @param {Error} error - an error object.
   * @param {object} info - info about the error.
   */
  componentDidCatch(error, info) {
    console.log(error, info);
  }

  /**
   * Displays ErrorPage if there are errors
   */
  render() {
    const { hasError } = this.state;
    const { children } = this.props;

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
