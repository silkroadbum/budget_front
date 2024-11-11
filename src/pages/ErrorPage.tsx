import { FC } from 'react';
import img from '../assets/error-page.png';
import { RoutePath } from '../router/routerConfig';
import { Link } from 'react-router-dom';

const ErrorPage: FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-900 font-roboto text-white">
      <img src={img} alt="404 error" className="w-1/3" />
      <Link
        to={RoutePath.home}
        className="rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600"
      >
        Назад
      </Link>
    </div>
  );
};

export default ErrorPage;
