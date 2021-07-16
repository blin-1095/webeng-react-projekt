
import HomePage from '../pages/home.jsx';
import AboutPage from '../pages/about.jsx';
import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/manifest.json/',
    component: '../manifest.json',
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
