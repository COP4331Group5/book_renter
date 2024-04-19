"use client";

import React from "react";
import "./subscribe.scss";

export default function SubscribeBody() {
    function submitForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    }

    return (
        <div className="w-full">
            <div className="order-form">
                <h2 className="order-form-h2">Order Form</h2>
                <form
                    id="purchaseForm"
                    className="order-form-inputs"
                    onSubmit={submitForm}
                >
                    <label htmlFor="fullName" className="order-form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
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
                        required
                        className="order-form-input"
                    />

                    <label htmlFor="subscription" className="order-form-label">
                        Subscription Plan
                    </label>
                    <select
                        id="subscription"
                        name="subscription"
                        required
                        className="order-form-input"
                    >
                        <option value="1 month">1 Month - $15</option>
                        <option value="3 months">3 Months - $35</option>
                        <option value="6 months">6 Months - $50</option>
                    </select>

                    <button type="submit" className="order-form-button">
                        Purchase
                    </button>
                </form>
            </div>
        </div>
    );
}
