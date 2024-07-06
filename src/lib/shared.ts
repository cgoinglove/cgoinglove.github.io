export const wait = (delay: number) =>
  new Promise((timeout) => setTimeout(timeout, delay));

export const arrayToMap = <T, K>(arr: T[], genKey: (element: T) => K) =>
  arr.reduce((map, elment) => map.set(genKey(elment), elment), new Map<K, T>());

export const genArray = <T = number>(
  length: number,
  generator: (index: number) => T = (i) => i as T
) =>
  Array.from(
    {
      length,
    },
    (_, i) => generator(i)
  );
export const isNull = (value: unknown): value is undefined | null =>
  value == undefined;

export class AsyncQueue {
  private promise: Promise<any>;

  constructor() {
    this.promise = Promise.resolve();
  }

  add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.promise = this.promise.then(() =>
        task().then(resolve).catch(reject)
      );
    });
  }
}
