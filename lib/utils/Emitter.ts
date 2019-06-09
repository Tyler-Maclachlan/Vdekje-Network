import { Listener, Disposable } from "../types";

export class TypedEvent<T> {
  private listeners: Listener<T>[] = [];
  private listenersOnce: Listener<T>[] = [];

  on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener)
    };
  };

  once = (listener: Listener<T>): void => {
    this.listenersOnce.push(listener);
  };

  off = (listener: Listener<T>) => {
    const cbIndex = this.listeners.indexOf(listener);
    if (cbIndex > -1) this.listeners.splice(cbIndex, 1);
  };

  emit = (event: T) => {
    this.listeners.forEach(listener => listener(event));

    if (this.listenersOnce.length) {
      this.listenersOnce.forEach(listener => listener(event));
      this.listenersOnce = [];
    }
  };

  pipe = (te: TypedEvent<T>): Disposable => {
    return this.on(e => te.emit(e));
  };
}
