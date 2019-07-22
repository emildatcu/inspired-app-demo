import * as React from 'react';

import { CircularProgress } from '@material-ui/core';

// tslint:disable-next-line: no-empty
const neverResolve = new Promise(() => { });
const Suspender = ({ suspend }: { suspend: boolean }) => {
  if (suspend) {
    throw neverResolve;
  } else {
    // tslint:disable-next-line: no-null-keyword
    return null;
  }
};
const LazyLoad = ({ show, children }: { show: boolean, children: React.ReactNode }) => {
  const { Suspense } = React;

  return (
    <Suspense fallback={<CircularProgress />}>
      {children}
      <Suspender suspend={!show} />
    </Suspense>
  );
};

export default LazyLoad;
