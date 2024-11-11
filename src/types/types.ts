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