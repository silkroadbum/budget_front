import React, { ChangeEvent, FC, useState } from 'react';
import { IUserData } from '../types/types';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-toastify';
import { setTokenToLocalStorage } from '../helpers/localStorage.helper';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../router/routerConfig';

const Auth: FC = () => {
  const [formData, setFormData] = useState<IUserData>({
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration(formData);
      if (data) {
        toast.success('Аккаунт создан.');
        setIsLogin(!isLogin);
      }
    } catch (err: any) {
      const error = err.response?.data?.message;
      toast.error(error.toString());
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login(formData);
      if (data) {
        setTokenToLocalStorage('token', data.token);
        dispatch(login(data));
        toast.success('Вы авторизовались.');
        navigate(RoutePath.home);
      }
    } catch (err: any) {
      const error = err.response?.data?.message;
      toast.error(error.toString());
    }
  };

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? 'Авторизация' : 'Регистрация'}
      </h1>
      <form
        className="mx-auto flex w-1/3 flex-col gap-5"
        onSubmit={isLogin ? loginHandler : registrationHandler}
      >
        <input
          type="text"
          className="input"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChangeInput}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChangeInput}
        />

        <button className="btn btn-green mx-auto" type="submit">
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="mt-5 flex justify-center">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            У вас нет аккуанта?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Уже имеется аккаунт?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
