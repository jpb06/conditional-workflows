import { getUser } from '../data-fetching/getUser';
import { getUserBorrowedBooks } from '../data-fetching/getUserBorrowedBooks';
import { Workflow } from './logic/workflow';
import { userExists } from './steps/user-exists';
import { userHasBorrowedBooks } from './steps/user-has-borrowed-books';
import { userHasPaidPlan } from './steps/user-has-paid-plan';
import { userIsAdmin } from './steps/user-is-admin';
import { WorkflowContext } from './types/workflow-context.interface';
import { DeadEnd } from './types/workflow-deadends.enum';
import { WorkflowGate } from './types/workflow-gates';

export const middlewareResolveFrom = async (
  step: WorkflowGate,
  email: string
): Promise<DeadEnd> => {
  const user = await getUser(email);

  const exists = user !== undefined;
  const isAdmin = user?.roles.includes('admin') || false;
  const plan = user?.plan || undefined;

  let hasBorrowedBooks = false;
  if (user) {
    hasBorrowedBooks = (await getUserBorrowedBooks(user.id)).length > 0;
  }

  const context: WorkflowContext = { startStep: step };

  const workflow = Workflow<WorkflowContext>(
    userExists(exists),
    userIsAdmin(isAdmin),
    userHasBorrowedBooks(hasBorrowedBooks),
    userHasPaidPlan(plan)
  );
  await workflow.execute(context);

  return context.deadEnd as DeadEnd;
};
