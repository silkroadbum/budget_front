import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import Categories from '../pages/Categories';
import Auth from '../pages/Auth';
import { RoutePath } from './routerConfig';

export const router = createBrowserRouter([
  {
    path: RoutePath.home,
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: RoutePath.transactions,
        element: <Transactions />,
      },
      {
        path: RoutePath.categories,
        element: <Categories />,
      },
      {
        path: RoutePath.auth,
        element: <Auth />,
      },
    ],
  },
]);
