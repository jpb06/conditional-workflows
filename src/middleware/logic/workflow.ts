export type NextFunction = () => Promise<void> | void;
type Middleware<T> = (context: T, next: NextFunction) => Promise<void> | void;
type Workflow<T> = {
  push: (...middlewares: Middleware<T>[]) => void;
  execute: (context: T) => Promise<void>;
};

export const Workflow = <T>(...middlewares: Middleware<T>[]): Workflow<T> => {
  const stack: Middleware<T>[] = middlewares;

  const push: Workflow<T>['push'] = (...middlewares) => {
    stack.push(...middlewares);
  };

  const execute: Workflow<T>['execute'] = async (context) => {
    let prevIndex = -1;
    const runner = async (index: number): Promise<void> => {
      if (index === prevIndex) {
        throw new Error('next() called multiple times');
      }
      prevIndex = index;
      const middleware = stack[index];
      if (middleware) {
        await middleware(context, () => {
          return runner(index + 1);
        });
      }
    };

    await runner(0);
  };

  return { push, execute };
};
