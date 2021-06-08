import { middlewareResolveFrom } from './';
import { DeadEnd } from './types/workflow-deadends.enum';
import { WorkflowGate as Gate } from './types/workflow-gates';

describe('middlewareResolveFrom function', () => {
  describe('From step 1', () => {
    it('should return signup if user does not exist', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserExists,
        'unknown@bro.com'
      );

      expect(deadEnd).toBe(DeadEnd.Signup);
    });

    it('should return admin-portal if user is an admin', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserExists,
        'yolanda@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.AdminPortal);
    });

    it('should return leased-books if user has borrowed books', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserExists,
        'bro@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.LeasedBooks);
    });

    it('should return mainstream-offers', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserExists,
        'yolo@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.MainstreamOffers);
    });

    it('should return bookworm-offers', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserExists,
        'yolila@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.BookwormOffers);
    });

    it('should return prestige-offers', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserExists,
        'boy@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.PrestigeOffers);
    });
  });

  describe('From step 4', () => {
    it('should return prestige-offers, bypassing the borrowed books step', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserHasPaidPlan,
        'bro@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.PrestigeOffers);
    });
  });
});
