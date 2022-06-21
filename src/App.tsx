import { Fragment } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorFallback } from '@/components';
import { appRoutes } from '@/routes';

function App() {
  return (
    <Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BrowserRouter>
          <Routes>
            {Object.values(appRoutes).map(({ path, component: Component }) => {
              return <Route key={path} path={path} element={<Component />} />;
            })}
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Fragment>
  );
}

export default App;
