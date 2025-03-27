import mainRoutes from './mainRoutes';

import { useRoutes } from 'react-router-dom';
import privateRoutes from './privateRoutes';

const routes = [...mainRoutes, ...privateRoutes];

const ElementsRoutes = () => {
  return useRoutes(routes);
};

export default ElementsRoutes;
