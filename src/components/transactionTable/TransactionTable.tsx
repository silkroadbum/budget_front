import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { IResponseTransactionsLoader } from '../../types/types';
import { formatDate } from '../../helpers/date.helper';

const TransactionTable: FC = () => {
  const { transactions } = useLoaderData() as IResponseTransactionsLoader;
  return (
    <>
      <div className="mt-4 rounded-md bg-slate-800 px-4 py-3">
        <table className="w-full">
          <thead>
            <tr>
              <td className="font-bold"> № </td>
              <td className="font-bold">Заголовок</td>
              <td className="font-bold">Количество($)</td>
              <td className="font-bold">Категория</td>
              <td className="font-bold">Дата</td>
              <td className="text-right">Действие</td>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type === 'income'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {transaction.amount}
                </td>
                <td>{transaction.category.title}</td>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>
                  <button className="btn hover:btn-red ml-auto">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTable;
