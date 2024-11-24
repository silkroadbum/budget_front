export interface IUser {
  id: number;
  email: string;
  token: string;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUser {
  email: string;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface IResponseUserData {
  token: string;
  user: IResponseUser;
}

export interface ICategory {
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  transactions?: [];
}

export interface ITransaction {
  amount: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  type: 'income' | 'expense';
  id: number;
  category: ICategory;
}

export interface IResponseTransactionsLoader {
  categories: Array<ICategory>;
  transactions: Array<ITransaction>;
  totalIncome: number;
  totalExpense: number;
}
