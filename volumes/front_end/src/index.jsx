import React from 'react';
import { render } from 'react-dom';

import App from './app';

fetch('http://localhost:8080/')
  .then(response => response.json())
  .then((myJson) => {
    console.log(JSON.stringify(myJson));
  });

render(<App />, document.getElementById(APP_MOUNT_ID));
