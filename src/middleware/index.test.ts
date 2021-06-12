import { middlewareResolveFrom } from './';
import { DeadEnd } from './types/workflow-deadends.enum';
import { WorkflowGate as Gate } from './types/workflow-gates';

describe('middlewareResolveFrom function', () => {
  describe('From step 1', () => {
    it('should return admin-portal if user is an admin', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserIsAdmin,
        'yolanda@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.AdminPortal);
    });

    it('should return payment if user is in debt', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserIsAdmin,
        'yolo@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.Payment);
    });

    it('should return leased-books if user has borrowed books', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserIsAdmin,
        'bro@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.LeasedBooks);
    });

    it('should return bookworm-offers', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserIsAdmin,
        'yolila@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.BookwormOffers);
    });

    it('should return prestige-offers', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserIsAdmin,
        'boy@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.PrestigeOffers);
    });
  });

  describe('From step 3', () => {
    it('should return mainstream offers, bypassing the debt check step', async () => {
      const deadEnd = await middlewareResolveFrom(
        Gate.UserHasBorrowedBooks,
        'yolo@cool.org'
      );

      expect(deadEnd).toBe(DeadEnd.MainstreamOffers);
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
