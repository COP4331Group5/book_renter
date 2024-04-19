"use client";

import Field from "@components/input/field/field";
import { emailRegex } from "@/lib/validate";
import { useRef } from "react";

import styles from "./account.module.scss";

export default function UpdateEmailForm({ emailAddress }) {
    let emailRef = useRef();
    let submitBtn = styles["submit-btn"];

    function change(ev) {
        ev.preventDefault();
        const email = emailRef.current.value;
        fetch("/api/v1/user/change_email", {
            method: "POST",
            body: JSON.stringify({
                email: email
            })
        }).then((_) => {
            location.reload();
        });
    }

    return (
        <form className="flex w-fit flex-col items-center rounded-lg bg-farground-light p-4 dark:bg-farground-dark">
            <h2>Change Email</h2>
            <br />
            <p>Current Email: {emailAddress.value}</p>
            <br />
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
        </form>
    );
}
