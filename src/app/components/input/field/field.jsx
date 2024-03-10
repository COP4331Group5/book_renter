import { forwardRef, useEffect } from "react";
import styles from "./field.module.scss";
import { None, Some, cancelable, sleep, Maybe } from "@/lib/fp";

const Field = forwardRef(function Field(
    { placeholder, type, required, partialCheck, fullCheck, expected },
    inputRef
) {
    /** @type {Maybe<[Promise<any>, () => void]>} */
    let sleepPromise = None;

    const partialCheckFn = partialCheck ?? ((_) => true);
    const fullCheckFn = fullCheck ?? ((_) => true);

    function onInput() {
        /** @type {HTMLInputElement} */
        const input = inputRef.current;

        if (!input.value || partialCheckFn(input.value)) {
            input.setCustomValidity("");
        } else {
            input.setCustomValidity(expected);
        }

        input.dispatchEvent(new Event("updatevalidity"));
    }

    function onBlur() {
        /** @type {HTMLInputElement} */
        const input = inputRef.current;

        if (!input.value || fullCheckFn(input.value)) {
            input.setCustomValidity("");
        } else {
            input.setCustomValidity(expected);
        }

        input.dispatchEvent(new Event("updatevalidity"));
    }

    function onKeydown() {
        /** @type {HTMLInputElement} */
        const input = inputRef.current;

        if (sleepPromise.isSome) {
            let [_, cancel] = sleepPromise.unwrap();
            cancel();
        }

        let [promise, cancel] = cancelable(sleep(1500), () => {
            clearTimeout(sleep);
        });

        let newSleepPromise = promise
            .then(() => {
                if (!input.value || fullCheckFn(input.value)) {
                    input.setCustomValidity("");
                } else {
                    input.setCustomValidity(expected);
                }

                input.dispatchEvent(new Event("updatevalidity"));
            })
            .catch((err) => {
                if (!err.message && err.message != "canceled") {
                    console.error(err);
                }
            });

        sleepPromise = Some([newSleepPromise, cancel]);
    }

    return (
        <input
            ref={inputRef}
            type={type}
            className={styles["text-input"]}
            placeholder={placeholder}
            required={required}
            onInput={onInput}
            onBlur={onBlur}
            onKeyDown={onKeydown}
        />
    );
});

export default Field;
