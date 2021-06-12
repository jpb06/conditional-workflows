import { getUserData } from '../data-fetching/getUserData';
import { Workflow } from './logic/workflow';
import { userHasBorrowedBooks } from './steps/user-has-borrowed-books';
import { userhasDebts } from './steps/user-has-debts';
import { userHasPaidPlan } from './steps/user-has-paid-plan';
import { userIsAdmin } from './steps/user-is-admin';
import { WorkflowContext } from './types/workflow-context.interface';
import { DeadEnd } from './types/workflow-deadends.enum';
import { WorkflowGate } from './types/workflow-gates';

export const middlewareResolveFrom = async (
  step: WorkflowGate,
  email: string
): Promise<DeadEnd> => {
  const { isAdmin, hasDebts, hasBorrowedBooks, plan } = await getUserData(
    email
  );

  const context: WorkflowContext = { startStep: step };

  const workflow = Workflow<WorkflowContext>(
    userIsAdmin(isAdmin),
    userhasDebts(hasDebts),
    userHasBorrowedBooks(hasBorrowedBooks),
    userHasPaidPlan(plan)
  );
  await workflow.execute(context);

  return context.deadEnd as DeadEnd;
};
