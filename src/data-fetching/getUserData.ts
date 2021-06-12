import { Plan } from '../types/data';
import { getUser } from './getUser';
import { getUserBorrowedBooks } from './getUserBorrowedBooks';
import { getUserDebts } from './getUserDebts';

interface UserData {
  isAdmin: boolean;
  hasBorrowedBooks: boolean;
  hasDebts: boolean;
  plan?: Plan;
}

export const getUserData = async (email: string): Promise<UserData> => {
  const user = await getUser(email);

  if (!user) {
    throw new Error('User not found');
  }

  const isAdmin = user?.roles.includes('admin') || false;
  const plan = user?.plan || undefined;
  const hasBorrowedBooks = (await getUserBorrowedBooks(user.id)).length > 0;
  const hasDebts = (await getUserDebts(user.id)).length > 0;

  return {
    isAdmin,
    hasBorrowedBooks,
    hasDebts,
    plan,
  };
};
