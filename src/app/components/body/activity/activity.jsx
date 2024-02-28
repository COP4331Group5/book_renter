import React from "react";
import "./activity.scss";

export default function Activity() {
    return (
        <div className="activity-section">
            <div className="heading flex">
                <h1>Weekly Schedule</h1>
            </div>

            <div className="sec-container grid">
                <div className="single-customer flex">
                    <div className="customerDetails">
                        <span className="name">Sunday</span>
                        <p>0 Books Due</p>
                    </div>
                    <div className="duration">January 28</div>
                </div>
                <div className="single-customer flex">
                    <div className="customerDetails">
                        <span className="name">Monday</span>
                        <p>2 Books Due</p>
                    </div>
                    <div className="duration">January 29</div>
                </div>
                <div className="single-customer flex">
                    <div className="customerDetails">
                        <span className="name">Tuesday</span>
                        <p>0 Books Due</p>
                    </div>
                    <div className="duration">January 30</div>
                </div>
                <div className="single-customer flex">
                    <div className="customerDetails">
                        <span className="name">Wednesday</span>
                        <p>1 Book Due</p>
                    </div>
                    <div className="duration">January 31</div>
                </div>
                <div className="single-customer flex">
                    <div className="customerDetails">
                        <span className="name">Thursday</span>
                        <p>3 Books Due</p>
                    </div>
                    <div className="duration">Febuary 1</div>
                </div>
                <div className="single-customer flex">
                    <div className="customerDetails">
                        <span className="name">Friday</span>
                        <p>0 Books Due</p>
                    </div>
                    <div className="duration">Febuary 2</div>
                </div>
                <div className="single-customer flex">
                    <div className="customerDetails">
                        <span className="name">Saturday</span>
                        <p>0 Books Due</p>
                    </div>
                    <div className="duration">Febuary 3</div>
                </div>
            </div>
        </div>
    );
}
