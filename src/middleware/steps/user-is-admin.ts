import { NextFunction } from '../logic/workflow';
import { WorkflowContext } from '../types/workflow-context.interface';
import { DeadEnds } from '../types/workflow-deadends.enum';
import { WorkflowGates as Gate } from '../types/workflow-gates';

export const userIsAdmin = (isAdmin: boolean) => {
  return async (
    context: WorkflowContext,
    next: NextFunction
  ): Promise<void> => {
    const isStepIgnored = context.startStep >= Gate.UserIsAdmin;
    if (isStepIgnored || !isAdmin) {
      return await next();
    }

    context.deadEnd = DeadEnds.AdminPortal;
  };
};
