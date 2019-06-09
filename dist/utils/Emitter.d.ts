import { Listener, Disposable } from "../types";
export declare class TypedEvent<T> {
    private listeners;
    private listenersOnce;
    on: (listener: Listener<T>) => Disposable;
    once: (listener: Listener<T>) => void;
    off: (listener: Listener<T>) => void;
    emit: (event: T) => void;
    pipe: (te: TypedEvent<T>) => Disposable;
}
//# sourceMappingURL=Emitter.d.ts.map