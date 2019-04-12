import React from 'react';
import ReactDOM from 'react-dom';

import('./core').then((core) => {
  const Core = core.default;

  ReactDOM.render(
    <Core />,
    document.getElementById(APP_MOUNT_ID),
  );
});
