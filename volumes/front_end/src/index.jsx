import React from 'react';
import { render } from 'react-dom';

import App from './app';

// Create WebSocket connection.
const ws = new WebSocket('ws://localhost:8080', ['json']);

// Connection opened
ws.addEventListener('open', (event) => {
  console.log(event);

  setTimeout(() => {
    console.log('sending second Hello Server!');
    ws.send(JSON.stringify([123]));
  }, 1000);

  console.log('sending first Hello Server!');
  ws.send(JSON.stringify([4567]));
});

ws.addEventListener('message', (event) => {
  console.log('Received:', JSON.parse(event.data)[0].length);
});

ws.addEventListener('error', (error) => {
  console.log(error);
});


// fetch('http://localhost:8080/pages', {
//   method: 'GET',
// })
//   .then(response => response.json())
//   .then((myJson) => {
//     console.log(JSON.stringify(myJson));
//   });

// fetch('http://localhost:8080/pages', {
//   method: 'POST',
//   body: JSON.stringify({
//     hello: 'world',
//   }),
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
//   .then(response => response.json())
//   .then((myJson) => {
//     console.log(JSON.stringify(myJson));
//   });

// fetch('http://localhost:8080/pages', {
//   method: 'PUT',
// })
//   .then(response => response.json())
//   .then((myJson) => {
//     console.log(JSON.stringify(myJson));
//   });

// fetch('http://localhost:8080/pages', {
//   method: 'DELETE',
// })
//   .then(response => response.json())
//   .then((myJson) => {
//     console.log(JSON.stringify(myJson));
//   });

render(<App />, document.getElementById(APP_MOUNT_ID));
