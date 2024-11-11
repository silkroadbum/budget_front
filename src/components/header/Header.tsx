import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
import { RoutePath } from '../../router/routerConfig';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../../helpers/localStorage.helper';
import { toast } from 'react-toastify';

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    toast.success('Вы вышли из аккаунта.');
    navigate(RoutePath.home);
  };

  return (
    <header className="flex items-center bg-slate-800 p-4 shadow-sm backdrop-blur-sm">
      <Link to="/">
        <FaBtc size={20} />
      </Link>

      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5">
            <li>
              <NavLink
                to={RoutePath.home}
                className={({ isActive }) =>
                  isActive ? 'text-red-400' : 'text-white'
                }
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to={RoutePath.transactions}
                className={({ isActive }) =>
                  isActive ? 'text-red-400' : 'text-white'
                }
              >
                Транзакции
              </NavLink>
            </li>
            <li>
              <NavLink
                to={RoutePath.categories}
                className={({ isActive }) =>
                  isActive ? 'text-red-400' : 'text-white'
                }
              >
                Категории
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {isAuth ? (
        <button className="btn btn-red" onClick={logoutHandler}>
          <span>Выйти</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link
          to={RoutePath.auth}
          className="ml-auto py-2 text-white/50 hover:text-white"
        >
          Зарегистрироваться / Войти
        </Link>
      )}
    </header>
  );
};

export default Header;
