import { PathRouteProps } from 'react-router-dom';

import { asyncComponentLoader } from '@/utils';

enum Pages {
  Page1,
  NotFound,
}

type Routes = Record<
  Pages,
  PathRouteProps & {
    title?: string;
    component: React.FC;
  }
>;

const appRoutes: Routes = {
  [Pages.Page1]: {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/',
    title: 'Page 1',
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default appRoutes;
