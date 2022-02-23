import { ResultSetHeader } from "mysql2";
import connection from "./connection";

import { IUser, User } from "./interfaces/IUser";

const getAllUsers = async (): Promise<User[]> => {
  const [rows] = await connection.execute('SELECT * FROM Users');
  return rows as User[];
};

const getUserById = async (id: number): Promise<User> => {
  const [rows] = await connection.execute('SELECT * FROM Users WHERE id=?', [id]);
  const [user] = rows as User[];
  return user;
};

const createUser = async (user: IUser): Promise<User> => {
  const { username, email, password } = user;
  const query = 'INSERT INTO Users (username, email, password) VALUE (?, ?, ?)';
  const [result] = await connection.execute<ResultSetHeader>(query, [username, email, password]);
  const { insertId: id } = result;
  return { id, username, email, password };
};

const updateUser = async (id: number, user: IUser) => {
  const { username, email, password } = user;
  const query = 'UPDATE Users SET username=?, email=?, password=? WHERE id=?';
  const result = await connection.execute(query, [username, email, password, id]);
  return { id, username, email, password };
};

const deleteUser = async (id: number): Promise<void> => {
  await connection.execute('DELETE FROM Users WHERE id=?', [id]);
  return;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}