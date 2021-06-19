export type Plan = 'advanced' | 'premium' | 'none';

export interface User {
  id: number;
  email: string;
  name: string;
  country?: string;
  plan?: Plan;
}
