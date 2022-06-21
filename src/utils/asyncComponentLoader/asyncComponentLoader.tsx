import { FC, Suspense, lazy, useEffect, useState } from 'react';

import { LoadingFallback } from '@/components';
import { defaultLoaderOptions } from '@/config';
import type { AnyProps, LoaderDefaultOptions } from '@/types';

import sleep from '../sleep';

type LoadComponent = () => Promise<{ default: React.ComponentType }>;

export function getDelayedFallback(Fallback: FC, delay: number) {
  return function DelayedFallback(props: AnyProps) {
    const [isDelayPassed, setIsDelayPassed] = useState(false);

    useEffect(() => {
      const timerId = setTimeout(() => setIsDelayPassed(true), delay);

      return () => clearTimeout(timerId);
    }, []);

    return isDelayPassed ? <Fallback {...props} /> : null;
  };
}

export const getLazyComponent = (
  loadComponent: LoadComponent,
  loaderOptions: LoaderDefaultOptions,
) =>
  lazy(() => {
    const start = performance.now();

    return loadComponent().then((moduleExports) => {
      const end = performance.now();
      const diff = end - start;

      const { delay, minimumLoading } = loaderOptions;

      if (diff < delay || (diff > delay && diff > delay + minimumLoading)) {
        return moduleExports;
      }

      return sleep(delay + minimumLoading - diff).then(() => moduleExports);
    });
  });

function asyncComponentLoader(
  loadComponent: LoadComponent,
  additionalProps: AnyProps = {},
  loaderOptions: LoaderDefaultOptions = defaultLoaderOptions,
  FallbackWaiting: FC = LoadingFallback,
) {
  const Fallback = loaderOptions.delay
    ? getDelayedFallback(FallbackWaiting, loaderOptions.delay)
    : FallbackWaiting;

  const LazyComponent = getLazyComponent(loadComponent, loaderOptions);

  return function AsyncComponent(props: AnyProps) {
    return (
      <Suspense fallback={<Fallback />}>
        <LazyComponent {...additionalProps} {...props} />
      </Suspense>
    );
  };
}

export default asyncComponentLoader;
