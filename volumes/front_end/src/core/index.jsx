import PropTypes from 'prop-types';
import React from 'react';

/**
 * @param {Object} [param] - this is object param.
 * @param {number} [param.siteName=Website] - this is siteName param.
 */
const Core = ({ siteName }) => (
  <div>
    <p>{siteName}</p>
  </div>
);

export default Core;

Core.defaultProps = {
  siteName: 'Website',
};

Core.propTypes = {
  siteName: PropTypes.string,
};
