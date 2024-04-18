"use client";

import { useRef, useState } from "react";
import styles from "./auth_form.module.scss";

import Field from "@components/input/field/field";
import { emailRegex } from "@/lib/validate";

const toggleBtn = styles["toggle-btn"];
const textInput = styles["text-input"];
const submitBtn = styles["submit-btn"];

export default function AuthForm() {
    let toggleBtnBgRef = useRef();

    const [showLoginForm, setShowLoginForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    function toggleLogin() {
        /** @type {HTMLButtonElement} */
        let toggleBtnBg = toggleBtnBgRef.current;
        toggleBtnBg.removeAttribute("data-right");
        setShowLoginForm(true);
    }

    function toggleSignup() {
        /** @type {HTMLButtonElement} */
        let toggleBtnBg = toggleBtnBgRef.current;
        toggleBtnBg.setAttribute("data-right", "");
        setShowLoginForm(false);
    }

    return (
        <div id={styles["auth-form"]}>
            <div className="mb-4 flex h-fit rounded-full bg-primary-dark">
                <div ref={toggleBtnBgRef} id={styles["toggle-btn-bg"]}></div>
                <button
                    type="button"
                    onClick={toggleLogin}
                    className={toggleBtn}
                    data-active
                >
                    <span>Log In</span>
                </button>
                <button
                    type="button"
                    onClick={toggleSignup}
                    className={toggleBtn}
                >
                    <span>Sign Up</span>
                </button>
            </div>
            {showLoginForm ? (
                <LoginForm setErrorMessage={setErrorMessage} />
            ) : (
                <SignupForm setErrorMessage={setErrorMessage} />
            )}
            {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
        </div>
    );
}

function LoginForm({ setErrorMessage }) {
    let formRef = useRef();
    let emailRef = useRef();
    let passwordRef = useRef();

    /**
     * @param {Event} ev
     */
    function login(ev) {
        ev.preventDefault();

        /** @type {HTMLFormElement} */
        let form = formRef.current;

        form.reportValidity();

        /** @type {HTMLInputElement} */
        let emailIn = emailRef.current;
        /** @type {HTMLInputElement} */
        let passwordIn = passwordRef.current;

        if (emailIn.validity.valid && passwordIn.validity.valid) {
            let body = JSON.stringify({
                email: emailIn.value,
                password: passwordIn.value
            });
            fetch("/api/v1/user/login", {
                method: "POST",
                body
            }).then((res) => {
                if (res.ok) {
                    window.location.href = "/dashboard";
                } else {
                    res.json()
                        .then((json) => {
                            console.error(json);
                            if (json.error == "IncorrectEmailOrPassword") {
                                setErrorMessage(
                                    "The email address or password is incorrect."
                                );
                            } else {
                                if (res.status == 400) {
                                    setErrorMessage(
                                        "Client-side issue. Try reloading the page."
                                    );
                                } else if (res.status == 500) {
                                    setErrorMessage(
                                        "Server-side issue. Try again another time."
                                    );
                                } else {
                                    setErrorMessage(
                                        "Unknown issue. Try again another time."
                                    );
                                }
                            }
                        })
                        .catch((_) => {
                            setErrorMessage(
                                "Unknown issue. Try again another time."
                            );
                        });
                }
            });
        }
    }

    return (
        <form
            ref={formRef}
            className="flex w-full flex-col items-stretch justify-between gap-4"
        >
            <Field
                ref={emailRef}
                type="text"
                placeholder="Email Address"
                fullCheck={(val) => emailRegex.test(val)}
                expected="Please enter a valid email address"
                required
            />
            <Field
                ref={passwordRef}
                type="password"
                placeholder="Password"
                expected="Please enter a valid password"
                required
            />
            <button type="submit" className={submitBtn} onClick={login}>
                <h3>Log In</h3>
            </button>
        </form>
    );
}

function SignupForm({ setErrorMessage }) {
    let formRef = useRef();
    let emailRef = useRef();
    let displayRef = useRef();
    let passwordRef = useRef();
    let passwordConfirmRef = useRef();
    let agreeToTOSRef = useRef();

    /**
     * @param {Event} ev
     */
    function signup(ev) {
        ev.preventDefault();

        /** @type {HTMLFormElement} */
        let form = formRef.current;

        form.reportValidity();

        /** @type {HTMLInputElement} */
        let emailIn = emailRef.current;
        /** @type {HTMLInputElement} */
        let displayIn = displayRef.current;
        /** @type {HTMLInputElement} */
        let passwordIn = passwordRef.current;
        /** @type {HTMLInputElement} */
        let passwordConfirmIn = passwordConfirmRef.current;
        /** @type {HTMLInputElement} */
        let agreeToTOS = agreeToTOSRef.current;

        if (
            emailIn.validity.valid &&
            displayIn.validity.valid &&
            passwordIn.validity.valid &&
            passwordConfirmIn.validity.valid &&
            agreeToTOS.value == "on"
        ) {
            let body = JSON.stringify({
                display: displayIn.value,
                email: emailIn.value,
                password: passwordIn.value
            });
            fetch("/api/v1/user/signup", {
                method: "POST",
                body
            }).then((res) => {
                if (res.ok) {
                    window.location.href = "/dashboard";
                } else {
                    res.json()
                        .then((json) => {
                            console.error(json);
                            if (json.error == "UserAlreadyExists") {
                                setErrorMessage(
                                    "This email address is already being used."
                                );
                            } else {
                                if (res.status == 400) {
                                    setErrorMessage(
                                        "Client-side issue. Try reloading the page."
                                    );
                                } else if (res.status == 500) {
                                    setErrorMessage(
                                        "Server-side issue. Try again another time."
                                    );
                                } else {
                                    setErrorMessage(
                                        "Unknown issue. Try again another time."
                                    );
                                }
                            }
                        })
                        .catch((_) => {
                            setErrorMessage(
                                "Unknown issue. Try again another time."
                            );
                        });
                }
            });
        }
    }

    return (
        <form
            ref={formRef}
            className="flex w-full flex-col items-stretch justify-between gap-4"
        >
            <Field
                ref={emailRef}
                type="email"
                className={textInput}
                placeholder="Email Address"
                fullCheck={(val) => emailRegex.test(val)}
                expected="Please enter a valid email address"
                required
            />
            <Field
                ref={displayRef}
                type="text"
                className={textInput}
                placeholder="Displayed Name"
                expected="Please enter a valid display name"
                required
            />
            <Field
                ref={passwordRef}
                type="password"
                className={textInput}
                fullCheck={(val) => {
                    return val.length >= 8;
                }}
                placeholder="Password (>= 8 characters)"
                expected="Please enter a valid password (8 or more characters long)"
                required
            />
            <Field
                ref={passwordConfirmRef}
                type="password"
                className={textInput}
                fullCheck={(val) => {
                    /** @type {HTMLInputElement} */
                    let passwordIn = passwordRef.current;

                    return val == passwordIn.value;
                }}
                placeholder="Password Confirmation"
                expected="Please enter the password entered above"
                required
            />
            <div className="flex w-64 items-center justify-center sm:w-72">
                <input
                    ref={agreeToTOSRef}
                    type="checkbox"
                    className="check-box ml-8"
                    required
                />
                <span className="w-40 text-center sm:w-48">
                    I agree to the terms and conditions
                </span>
            </div>
            <button type="submit" className={submitBtn} onClick={signup}>
                <h3>Sign Up</h3>
            </button>
        </form>
    );
}

function ErrorMessage({ message }) {
    return (
        <div className="mt-4 rounded-2xl border border-red-400 bg-red-600 p-4">
            <h3>Error:</h3>
            <p>{message}</p>
        </div>
    );
}
