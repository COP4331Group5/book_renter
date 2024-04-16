export function isNothing(x) {
    return x === null || x === undefined;
}

export function isSomething(x) {
    return x !== null && x !== undefined;
}

/** @type {symbol} */
export const unit = Symbol("UNIT");

/** @template T */
export class Maybe {
    /** @type {?T} */
    #value;

    /**
     * @template A
     * @param {!A} x
     * @returns {Maybe<A>}
     */
    static some(x) {
        return new Maybe(x);
    }

    static none() {
        return new Maybe(null);
    }

    constructor(x) {
        this.#value = x ?? null;
    }

    get isNone() {
        return this.#value === null;
    }

    get isSome() {
        return this.#value !== null;
    }

    /**
     * Runs a function on the contained value.
     * @param {(x: T) => void} fn Function to be called on the value.
     */
    inspect(fn) {
        if (this.isSome) {
            fn(this.#value);
        }
    }

    /**
     * Map `Some<T>` to `Some<A>`.
     * @template A
     * @param {(x: T) => A} fn Function that maps `T` to `A`.
     * @returns {Maybe<A>}
     */
    map(fn) {
        return this.isNone ? None : Maybe.some(fn(this.#value));
    }

    /**
     * Filters the container value.
     * @param {(x: T) => boolean} fn
     * @returns {Maybe<T>}
     */
    filter(fn) {
        return this.isNone ? None : fn(this.#value) ? Some(this.#value) : None;
    }

    unwrap() {
        if (this.isNone) {
            throw new Error(`${typeof this} is 'None'`);
        }
        return this.#value;
    }

    /**
     * @template A
     * @typedef {{Some: (x: T) => A, None: () => A}} Branches
     */

    /**
     * @template A
     * @param {Branches<A>} branches
     * @returns {A}
     */
    match(branches) {
        if (this.isSome) {
            return branches.Some(this.#value);
        } else {
            return branches.None();
        }
    }

    toString() {
        return this.isNone ? "None" : `Some(${this.#value})`;
    }
}

export const Some = Maybe.some;
export const None = Maybe.none();

/**
 * @template T
 * @template E
 */
export class Result {
    /** @type {(!T | !E)} */
    #value;
    /** @type {boolean} */
    #err;

    /**
     * @template T
     * @param {!T} x
     * @returns {Result<T, any>}
     */
    static ok(x) {
        return new Result(x, false);
    }

    /**
     * @template E
     * @param {!E} x
     * @returns {Result<any, E>}
     */
    static err(x) {
        return new Result(x, true);
    }

    /**
     * @param {(!T | !E)} x
     * @param {boolean} error
     */
    constructor(x, error) {
        this.#value = x;
        this.#err = error;
    }

    get isOk() {
        return !this.#err;
    }

    get isErr() {
        return this.#err;
    }

    /**
     * Map `Result<T, E>` to `Result<A, E>`
     * @template A
     * @param {(x: T) => A} fn
     * @returns {Result<A, E>}
     */
    map(fn) {
        return this.isErr
            ? this
            : Result.ok(
                  fn(
                      /** @type {T} */
                      (this.#value)
                  )
              );
    }

    /**
     * Map `Result<T, E>` to `Result<A, E>`
     * @template A
     * @param {(x: E) => A} fn
     * @returns {Result<T, A>}
     */
    mapErr(fn) {
        return this.isOk
            ? this
            : Result.err(
                  fn(
                      /** @type {E} */
                      (this.#value)
                  )
              );
    }

    /**
     * @returns {T}
     */
    unwrap() {
        if (this.isErr) {
            throw new Error(`Value is an error!`);
        }
        return this.#value;
    }

    /**
     * @returns {E}
     */
    unwrapErr() {
        if (this.isOk) {
            throw new Error(`Value is ok!`);
        }
        return this.#value;
    }

    /**
     * @returns {T | E}
     */
    unwrapUnchecked() {
        return this.#value;
    }

    /**
     * Returns an `Maybe<T>`.
     * @returns {Maybe<T>}
     */
    ok() {
        return this.match({
            Ok: (t) => Some(t),
            Err: (_) => None
        });
    }

    /**
     * Returns an `Maybe<E>`.
     * @returns {Maybe<E>}
     */
    err() {
        return this.match({
            Ok: (_) => None,
            Err: (e) => Some(e)
        });
    }

    /**
     * @template A
     * @typedef {{Ok: (x: T) => A, Err: (x: E) => A}} Branches
     */

    /**
     * @template A
     * @param {Branches<A>} branches
     * @returns {A}
     */
    match(branches) {
        if (this.isOk) {
            return branches.Ok(this.#value);
        } else {
            return branches.Err(this.#value);
        }
    }

    /**
     * @template A
     * @param {(x) => Result<A, E>} fn
     * @returns {Result<A, E>}
     */
    andThen(fn) {
        return this.match({
            Ok: (t) => fn(t),
            Err: (e) => Err(e)
        });
    }

    /**
     * @this {Result<Result<T, E>, E>}
     * @returns {Result<T, E>}
     */
    flatten() {
        return this.andThen((x) => x);
    }

    toString() {
        return this.isErr ? `Err(${this.#value})` : `Ok(${this.#value})`;
    }
}

export const Ok = Result.ok;
export const Err = Result.err;

/**
 * Tries to resolve a promise and returns the result.
 * @template T
 * @param {Promise<T>} promise
 * @returns {Promise<Result<T, Error>>}
 */
export async function tryPromise(promise) {
    let result;
    try {
        result = Ok(await promise);
    } catch (e) {
        result = Err(e);
    }
    return result;
}

/**
 * Runs a function in a try-catch and returns the result.
 * @template T
 * @param {() => T} fn
 * @returns {Result<T, Error>}
 */
export function tryCatch(fn) {
    let result;
    try {
        result = Ok(fn());
    } catch (e) {
        result = Err(e);
    }
    return result;
}

/**
 * Allows for canceling a promise.
 * @param {Promise<any>} promise Promise that may be canceled.
 * @param {() => void | null | undefined} dropFn Function to clean up promise on cancel.
 * @returns {[Promise<any>, () => void]}
 */
export function cancelable(promise, dropFn) {
    let drop = new Maybe(dropFn);
    const isCancelled = { value: false };
    const wrapped = new Promise((res, rej) => {
        promise
            .then((v) => {
                return isCancelled.value ? rej(new Error("cancelled")) : res(v);
            })
            .catch((e) => {
                return isCancelled.value ? new Error("cancelled") : e;
            });
    });

    const cancel = () => {
        isCancelled.value = true;
        drop.inspect((d) => d());
    };

    return [wrapped, cancel];
}

/**
 * Delays a promise.
 * @param {number} delay Time in milliseconds to delay.
 * @returns {Promise<void>}
 */
export function sleep(delay) {
    return new Promise((resolve, _) => {
        setTimeout(resolve, delay);
    });
}
