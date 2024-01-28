export function is_nothing(x) {
    return x === null || x === undefined;
}

export function is_something(x) {
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

    get is_none() {
        return this.#value === null;
    }

    get is_some() {
        return this.#value !== null;
    }

    /**
     * Map `Some<T>` to `Some<A>`.
     * @template A
     * @param {(x: T) => A} fn Function that maps `T` to `A`.
     * @returns {Maybe<A>}
     */
    map(fn) {
        return this.is_none ? None : Maybe.some(fn(this.#value));
    }

    unwrap() {
        if (this.is_none) {
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
        if (this.is_some) {
            return branches.Some(this.#value);
        } else {
            return branches.None();
        }
    }

    toString() {
        return this.is_none ? "None" : `Some(${this.#value})`;
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

    get is_ok() {
        return !this.#err;
    }

    get is_err() {
        return this.#err;
    }

    /**
     * Map `Result<T, E>` to `Result<A, E>`
     * @template A
     * @param {(x: T) => A} fn
     * @returns {Result<A, E>}
     */
    map(fn) {
        return this.is_err
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
    map_err(fn) {
        return this.is_ok
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
        if (this.is_err) {
            throw new Error(`Value is an error!`);
        }
        return this.#value;
    }

    /**
     * @returns {E}
     */
    unwrap_err() {
        if (this.is_ok) {
            throw new Error(`Value is ok!`);
        }
        return this.#value;
    }

    /**
     * @returns {T | E}
     */
    unwrap_unchecked() {
        return this.#value;
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
        if (this.is_ok) {
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
    and_then(fn) {
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
        return this.and_then((x) => x);
    }

    toString() {
        return this.is_err ? `Err(${this.#value})` : `Ok(${this.#value})`;
    }
}

export const Ok = Result.ok;
export const Err = Result.err;

/**
 * Runs a promise and returns the result.
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
