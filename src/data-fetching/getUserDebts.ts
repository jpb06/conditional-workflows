import { readJson } from 'fs-extra';

import { UserDebt } from '../types/data';

export const getUserDebts = async (idUser: number) => {
  const debts = (await readJson('./data/debts.json')) as Array<UserDebt>;

  return debts.filter((el) => el.idUser === idUser);
};
