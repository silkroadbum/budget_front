import { FC } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface IProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }) => {
  const isAuth = useAuth();

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="mt-20 flex flex-col items-center justify-center gap-10">
          <h1 className="text-2xl">
            Для просмотра данной страницы вы должны быть авторизованы.
          </h1>
        </div>
      )}
    </>
  );
};
