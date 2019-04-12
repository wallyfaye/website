import React, { Suspense } from 'react';

import ErrorBoundary from '../errorBoundary';
import Loading from '../loading';

const Core = React.lazy(() => import('../core'));

const App = () => (
  <ErrorBoundary>
    <Suspense fallback={<Loading />}>
      <Core />
    </Suspense>
  </ErrorBoundary>
);

export default App;
