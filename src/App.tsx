import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { getTokenFromLocalStorage } from './helpers/localStorage.helper';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/user/userSlice';

function App() {
  const dispatch = useAppDispatch();

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await AuthService.getProfile();

        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
