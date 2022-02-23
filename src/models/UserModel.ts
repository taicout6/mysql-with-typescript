import { ResultSetHeader } from "mysql2";
import connection from "./connection";

interface IUser {
  username: string,
  email: string,
  password: string,
}

interface User extends IUser {
  id: number;
}

const getAll = async (): Promise<User[]> => {
  const [rows] = await connection.execute('SELECT * FROM Users');
  return rows as User[];
};

const getById = async (id: number): Promise<User> => {
  const [rows] = await connection.execute('SELECT * FROM Users WHERE id = ?', [id]);
  const [user] = rows as User[];
  return user;
};

const create = async (user: IUser): Promise<User> => {
  const { username, email, password } = user;
  const query = 'INSERT INTO Users (username, email, password) VALUE (?, ?, ?)';
  const [result] = await connection.execute<ResultSetHeader>(query, [username, email, password]);
  const { insertId: id } = result;
  return { id, username, email, password };
}

export default {
  getAll,
  getById,
  create,
}