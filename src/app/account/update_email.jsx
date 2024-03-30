"use client";

import Field from "@components/input/field/field";
import { emailRegex } from "@/lib/validate";
import { useRef } from "react";

import styles from "./account.module.scss";

export default function UpdateEmailForm() {
    let emailRef = useRef();
    let submitBtn = styles["submit-btn"];

    function change() {

    }

    return <form className="w-fit rounded-lg p-4 bg-farground-light dark:bg-farground-dark flex flex-col items-center">
        <h2>Change Email</h2><br />
        <Field
                ref={emailRef}
                type="text"
                placeholder="Email Address"
                fullCheck={(val) => emailRegex.test(val)}
                expected="Please enter a valid email address"
                required
            />
        <button type="submit" className={submitBtn} onClick={change}>
                <h3>Change</h3>
        </button>
    </form>;
}
