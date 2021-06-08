import { readJson } from 'fs-extra';

import { BorrowedBook } from '../types/data';

export const getUserBorrowedBooks = async (idUser: number) => {
  const books = (await readJson(
    './data/borrowed-books.json'
  )) as Array<BorrowedBook>;

  return books.filter((el) => el.idUser === idUser);
};
