import { toast } from 'react-toastify';
import { instance } from '../api/axios.api';
import TransactionForm from '../components/transactionForm/TransactionForm';
import {
  ICategory,
  IResponseTransactionsLoader,
  ITransaction,
} from '../types/types';
import TransactionTable from '../components/transactionTable/TransactionTable';
import { useLoaderData } from 'react-router-dom';
import { formatToUSD } from '../helpers/currency.helper';
import Chart from '../components/chart/Chart';

export const transactionLoader = async () => {
  const categories = await instance.get<Array<ICategory>>('/categories');
  const transactions = await instance.get<Array<ITransaction>>('/transactions');
  const totalIncome = await instance.get<number>('/transactions/income/find');
  const totalExpense = await instance.get<number>('/transactions/expense/find');

  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  };

  return data;
};

export const transactionAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const newTransaction = {
        title: formData.get('title'),
        amount: +formData.get('amount'),
        category: formData.get('category'),
        type: formData.get('type'),
      };
      await instance.post('/transactions', newTransaction);
      toast.success('Транзакция добавлена.');
      return null;
    }
    case 'DELETE': {
      const formData = await request.formData();
      const transactionId = formData.get('id');
      await instance.delete(`/transactions/transaction/${transactionId}`);
      toast.success('Транзакция удалена.');
      return null;
    }
    default: {
      return null;
    }
  }
};

const Transactions = () => {
  const { totalExpense, totalIncome } =
    useLoaderData() as IResponseTransactionsLoader;
  return (
    <>
      <div className="mt-4 grid grid-cols-3 items-start gap-4">
        {/* Форма добавление транзакции */}
        <div className="col-span-2 grid">
          <TransactionForm />
        </div>

        {/* Блок статистики */}
        <div className="rounded-md bg-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-md text-center font-bold uppercase">
                Общий доход:
              </p>
              <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
                {formatToUSD.format(totalIncome)}
              </p>
            </div>

            <div>
              <p className="text-md text-center font-bold uppercase">
                Общий расход:
              </p>
              <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
                {formatToUSD.format(totalExpense)}
              </p>
            </div>
          </div>

          <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
        </div>
      </div>

      {/* Таблица транзакций */}
      <div className="my-5">
        <TransactionTable limit={5} />
      </div>
    </>
  );
};

export default Transactions;
