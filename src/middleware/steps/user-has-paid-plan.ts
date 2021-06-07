import { Plan } from '../../types/data';
import { NextFunction } from '../logic/workflow';
import { WorkflowContext } from '../types/workflow-context.interface';
import { DeadEnds } from '../types/workflow-deadends.enum';

export const userHasPaidPlan = (plan?: Plan) => {
  return async (context: WorkflowContext, _: NextFunction): Promise<void> => {
    if (!plan || plan === 'none') {
      context.deadEnd = DeadEnds.MainstreamOffers;
    } else if (plan === 'premium') {
      context.deadEnd = DeadEnds.BookwormOffers;
    } else if (plan === 'advanced') {
      context.deadEnd = DeadEnds.PrestigeOffers;
    }
  };
};
