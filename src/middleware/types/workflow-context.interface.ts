import { DeadEnd } from './workflow-deadends.enum';
import { WorkflowGate } from './workflow-gates';

export interface WorkflowContext {
  startStep: WorkflowGate;
  deadEnd?: DeadEnd;
}
