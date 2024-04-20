"use client";

import { useRef } from "react";
import "./subscribe.scss";
import { useRouter } from "next/navigation";

export default function SubscribeBody({ title, author, bookId }) {
    const router = useRouter();
    const nameRef = useRef();
    const addressRef = useRef();
    const emailRef = useRef();
    const cardNumRef = useRef();
    const expiryRef = useRef();
    const cvvRef = useRef();
    const monthsRef = useRef();

    function submitForm(ev) {
        ev.preventDefault();
        const name = nameRef.current.value;
        const address = addressRef.current.value;
        const email = emailRef.current.value;
        const cardNum = cardNumRef.current.value;
        const expiry = expiryRef.current.value;
        const cvv = cvvRef.current.value;
        const months = monthsRef.current.value;

        if (
            !name ||
            !address ||
            !email ||
            !cardNum ||
            !expiry ||
            !cvv ||
            !months
        ) {
            return;
        }

        const form = {
            name: name,
            address: address,
            email: email,
            cardNum: cardNum,
            expiry: expiry,
            cvv: parseInt(cvv),
            months: parseInt(months),
            bookId: bookId
        };

        fetch("/api/v1/store/rent", {
            method: "POST",
            body: JSON.stringify(form)
        })
            .then((_) => {
                router.push("/library");
            })
            .catch((e) => {
                console.error(e);
                location.reload();
            });
    }

    return (
        <div className="w-full overflow-y-auto">
            <div className="order-form">
                <h2 className="order-form-h2">Order Form</h2>
                <h2 className="mb-4 text-primary">
                    Rent "{title} by {author}"
                </h2>
                <form id="purchaseForm" className="order-form-inputs">
                    <label htmlFor="fullName" className="order-form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        ref={nameRef}
                        required
                        className="order-form-input"
                    />

                    <label htmlFor="address" className="order-form-label">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        ref={addressRef}
                        required
                        className="order-form-input"
                    />

                    <label htmlFor="email" className="order-form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        required
                        className="order-form-input"
                    />

                    <label htmlFor="cardNumber" className="order-form-label">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        ref={cardNumRef}
                        required
                        className="order-form-input"
                    />

                    <label
                        htmlFor="expirationDate"
                        className="order-form-label"
                    >
                        Expiration Date
                    </label>
                    <input
                        type="text"
                        id="expirationDate"
                        name="expirationDate"
                        placeholder="MM/YY"
                        ref={expiryRef}
                        required
                        className="order-form-input"
                    />

                    <label htmlFor="cvv" className="order-form-label">
                        CVV
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        ref={cvvRef}
                        required
                        className="order-form-input"
                    />

                    <label htmlFor="subscription" className="order-form-label">
                        Subscription Plan
                    </label>
                    <select
                        id="subscription"
                        name="subscription"
                        ref={monthsRef}
                        required
                        className="order-form-input"
                    >
                        <option value="1">1 Month - $15</option>
                        <option value="3">3 Months - $35</option>
                        <option value="6">6 Months - $50</option>
                    </select>

                    <button
                        type="submit"
                        className="order-form-button"
                        onClick={submitForm}
                    >
                        Purchase
                    </button>
                </form>
            </div>
        </div>
    );
}
