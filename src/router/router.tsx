import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Transactions from '../pages/Transactions';
import Categories from '../pages/Categories';
import Auth from '../pages/Auth';
import { RoutePath } from './routerConfig';
import { ProtectedRoute } from '../components/protectedRoute/ProtectedRoute';

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
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.categories,
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: RoutePath.auth,
        element: <Auth />,
      },
    ],
  },
]);
