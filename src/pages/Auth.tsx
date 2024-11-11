import { ChangeEvent, FC, useState } from 'react';

const Auth: FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="mt-40 flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? 'Авторизация' : 'Регистрация'}
      </h1>
      <form className="mx-auto flex w-1/3 flex-col gap-5">
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

        <button className="btn btn-green mx-auto">
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
