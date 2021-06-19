import { getUserData } from '../data-fetching/getUserData';
import { Workflow } from './logic/workflow';
import { userHasBorrowedBooks, userhasDebts, userHasMissingInfo, userHasPaidPlan } from './steps';
import { WorkflowContext } from './types/workflow-context.interface';
import { DeadEnd } from './types/workflow-deadends.enum';
import { WorkflowGate } from './types/workflow-gates';

export const middlewareResolveFrom = async (
  step: WorkflowGate,
  email: string
): Promise<DeadEnd> => {
  const { hasMissingInfo, hasDebts, hasBorrowedBooks, plan } =
    await getUserData(email);

  const context: WorkflowContext = { startStep: step };

  const workflow = Workflow<WorkflowContext>(
    userHasMissingInfo(hasMissingInfo),
    userhasDebts(hasDebts),
    userHasBorrowedBooks(hasBorrowedBooks),
    userHasPaidPlan(plan)
  );
  await workflow.execute(context);

  return context.deadEnd as DeadEnd;
};
