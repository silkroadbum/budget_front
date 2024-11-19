import { toast } from 'react-toastify';
import { instance } from '../api/axios.api';
import TransactionForm from '../components/transactionForm/TransactionForm';
import { ICategory } from '../types/types';
import TransactionTable from '../components/transactionTable/TransactionTable';

export const transactionLoader = async () => {
  const categories = await instance.get<Array<ICategory>>('/categories');
  const transactions = await instance.get<Array<ICategory>>('/transactions');

  const data = {
    categories: categories.data,
    transactions: transactions.data,
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
    default: {
      return null;
    }
  }
};

const Transactions = () => {
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
                1000$
              </p>
            </div>

            <div>
              <p className="text-md text-center font-bold uppercase">
                Общий расход:
              </p>
              <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
                1000$
              </p>
            </div>
          </div>

          <div>Chart</div>
        </div>
      </div>

      {/* Таблица транзакций */}
      <div className="my-5">
        <TransactionTable />
      </div>
    </>
  );
};

export default Transactions;
