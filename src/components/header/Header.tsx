import { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
import { RoutePath } from '../../router/routerConfig';

const Header: FC = () => {
  const isAuth = true;
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
        <button className="btn btn-red">
          <span>Выйти</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link
          to={RoutePath.auth}
          className="ml-auto py-2 text-white/50 hover:text-white"
        >
          Войти
        </Link>
      )}
    </header>
  );
};

export default Header;
