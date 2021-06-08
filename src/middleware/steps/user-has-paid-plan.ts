import { Plan } from '../../types/data';
import { NextFunction } from '../logic/workflow';
import { WorkflowContext } from '../types/workflow-context.interface';
import { DeadEnd } from '../types/workflow-deadends.enum';

export const userHasPaidPlan = (plan?: Plan) => {
  return async (context: WorkflowContext, _: NextFunction): Promise<void> => {
    if (plan === 'premium') {
      context.deadEnd = DeadEnd.BookwormOffers;
    } else if (plan === 'advanced') {
      context.deadEnd = DeadEnd.PrestigeOffers;
    } else {
      context.deadEnd = DeadEnd.MainstreamOffers;
    }
  };
};
