import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './errorBoundary';
import Loading from './loading';

const Core = React.lazy(() => import('./core'));

ReactDOM.render(
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <Core />
    </Suspense>
  </ErrorBoundary>,
  document.getElementById(APP_MOUNT_ID),
);
