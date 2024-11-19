import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransactionsLoader } from '../../types/types';
import CategoryModal from '../categoryModal/CategoryModal';

const TransactionForm: FC = () => {
  const { categories } = useLoaderData() as IResponseTransactionsLoader;
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-2" method="post" action="/transactions">
        <label className="grid" htmlFor="title">
          <span>Заголовок</span>
          <input
            className="input border-slate-700"
            type="text"
            placeholder="Заголовок..."
            name="title"
            required
          />
        </label>
        <label className="grid" htmlFor="amount">
          <span>Количество</span>
          <input
            className="input border-slate-700"
            type="number"
            placeholder="Количество..."
            name="amount"
            required
          />
        </label>

        {categories.length ? (
          <label htmlFor="category" className="grid">
            <span>Категория</span>
            <select
              className="input border-slate-700 bg-slate-800"
              name="category"
              required
            >
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1 className="mt-1 text-red-300">
            Для продолжения сначала создайте категорию
          </h1>
        )}

        <button
          className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white"
          onClick={() => setIsVisibleModal(true)}
        >
          <FaPlus />
          <span>управлять категориями</span>
        </button>

        <div className="flex items-center gap-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value="income"
              className="form-radio text-blue-600"
            />
            <span>Доход</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="type"
              value="expense"
              className="form-radio text-blue-600"
            />
            <span>Расход</span>
          </label>
        </div>

        <button type="submit" className="btn btn-green mt-2 max-w-fit">
          Сохранить
        </button>
      </Form>

      {isVisibleModal && (
        <CategoryModal type="post" setVisibleModal={setIsVisibleModal} />
      )}
    </div>
  );
};

export default TransactionForm;
