import { NextFunction } from '../logic/workflow';
import { WorkflowContext } from '../types/workflow-context.interface';
import { DeadEnds } from '../types/workflow-deadends.enum';
import { WorkflowGates as Gate } from '../types/workflow-gates';

export const userHasBorrowedBooks = (hasBorrowedBooks: boolean) => {
  return async (
    context: WorkflowContext,
    next: NextFunction
  ): Promise<void> => {
    const isStepIgnored = context.startStep >= Gate.UserHasBorrowedBooks;

    if (isStepIgnored || !hasBorrowedBooks) {
      return await next();
    }

    context.deadEnd = DeadEnds.LeasedBooks;
  };
};
