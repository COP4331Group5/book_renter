"use client";

import { Children, useState } from "react";

export function TabBar({ children }) {
    let [currentTab, setCurrentTab] = useState(0);

    const tabs = Children.map(children, (child, index) => {
        let name = child.props.name;

        let switchTab = () => {
            setCurrentTab(index);
        };

        return (
            <li
                className={`me-2 border-b-2 ${currentTab == index ? "border-primary text-primary hover:border-primary-light hover:text-primary-light" : "opacity-50 hover:opacity-100"}`}
            >
                <button onClick={switchTab} className="inline-block p-2">
                    {name}
                </button>
            </li>
        );
    });

    return (
        <div className="h-full w-full">
            <nav className="border-b border-highlight-light dark:border-highlight-dark">
                <ul className="-mb-px flex flex-wrap">{tabs}</ul>
            </nav>
            {children[currentTab]}
        </div>
    );
}

export function Tab({ children }) {
    return <div className="mt-2">{children}</div>;
}
