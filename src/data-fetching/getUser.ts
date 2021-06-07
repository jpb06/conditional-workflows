import { readJson } from 'fs-extra';

import { User } from '../types/data';

export const getUser = async (email: string) => {
  const users = (await readJson('./data/users.json')) as Array<User>;

  return users.find((el) => el.email === email);
};
