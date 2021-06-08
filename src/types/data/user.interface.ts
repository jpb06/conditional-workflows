export type Plan = 'advanced' | 'premium' | 'none';
export type Role = 'admin' | 'user';

export interface User {
  id: number;
  email: string;
  name: string;
  roles: Array<Role>;
  plan?: Plan;
}
