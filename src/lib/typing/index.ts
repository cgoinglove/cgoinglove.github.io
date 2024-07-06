import { genArray, wait } from '@lib/shared';

type Option = {
  initialValue: string;
  delay: number;
};

export class Typing {
  private isRunning: boolean = false;
  private lastText: string = '';
  private taskQueue: Function[] = [];
  private delay = 60;
  // change text event callback
  private callback: Function = () => {};
  constructor(option?: Partial<Option>) {
    if (option?.delay != undefined) this.delay = option.delay;
    if (option?.initialValue != undefined) this.lastText = option.initialValue;
  }

  stop() {
    this.taskQueue = [];
    return this;
  }
  private excute() {
    const task = this.taskQueue.shift();
    if (task) {
      const promise = task() as Promise<void>;
      if (promise instanceof Promise)
        promise.then(() => {
          this.excute();
        });
      else this.excute();
    } else this.isRunning = false;
  }
  run(callback: (value: string) => void) {
    if (this.isRunning) return Promise.resolve();
    return new Promise((clear) => {
      this.isRunning = true;
      this.callback = callback;
      this.taskQueue.push(clear);
      this.excute();
    });
  }

  sleep(delay: number = 3000) {
    this.taskQueue.push(wait.bind(null, delay));
    return this;
  }
  text(text: string) {
    const array = this.gen(this.lastText, text);
    this.lastText = text;
    this.taskQueue.push(
      ...array.map((next) => () => {
        this.callback(next);
        return wait(this.delay + this.delay * (Math.random() - 0.5));
      })
    );
    return this;
  }
  private gen(start: string, end: string): string[] {
    if (start == end) return [start];
    if (!start) return this.getWriteArray(end);
    if (!end) return this.getDeleterArray(start);

    const relativeIndex = genArray(
      Math.min(start.length, end.length)
    ).findIndex((i) => {
      return start[i] !== end[i];
    });
    const prefix = start.slice(0, relativeIndex);

    return [
      ...this.getDeleterArray(start.slice(relativeIndex)),
      ...this.getWriteArray(end.slice(relativeIndex)),
    ].map((text) => `${prefix}${text}`);
  }
  private getDeleterArray(text: string) {
    return genArray(text.length, (i) => text.slice(0, text.length - i - 1));
  }
  private getWriteArray(text: string) {
    return genArray(text.length, (i) => text.slice(0, i + 1));
  }
}
