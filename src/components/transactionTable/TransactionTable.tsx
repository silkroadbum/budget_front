import { FC, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransactionsLoader, ITransaction } from '../../types/types';
import { formatDate } from '../../helpers/date.helper';
import { formatToUSD } from '../../helpers/currency.helper';
import { instance } from '../../api/axios.api';
import ReactPaginate from 'react-paginate';

interface ITransactionTableProps {
  limit?: number;
}

const TransactionTable: FC<ITransactionTableProps> = ({ limit = 3 }) => {
  const { transactions } = useLoaderData() as IResponseTransactionsLoader;

  const [data, setData] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTransactions = async (page: number) => {
    const response = await instance.get(
      `/transactions/pagination?page=${page}&limit=${limit}`,
    );
    console.log(response.data);
    setData(response.data[0]);
    setTotalPages(Math.ceil(transactions.length / limit));
  };

  const handleChangePage = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, transactions]);

  return (
    <>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handleChangePage}
        className="mt-4 flex items-center justify-end gap-3"
        activeClassName="bg-blue-600 rounded-sm"
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
        previousLabel="Предыдущие"
        previousClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        nextClassName="text-white py-1 px-2 bg-slate-800 rounded-sm text-xs"
        nextLabel="Следующие"
        disabledClassName="text-white/50 cursor-not-allowed"
        disabledLinkClassName="text-slate-600 cursor-not-allowed"
      />
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
            {data?.map((transaction, index) => (
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
                  {transaction.type === 'income'
                    ? `+ ${formatToUSD.format(transaction.amount)}`
                    : `- ${formatToUSD.format(transaction.amount)}`}
                </td>
                <td>{transaction.category?.title || 'Other'}</td>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>
                  <Form method="delete" action="/transactions">
                    <input type="hidden" name="id" value={transaction.id} />
                    <button type="submit" className="btn hover:btn-red ml-auto">
                      <FaTrash />
                    </button>
                  </Form>
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
