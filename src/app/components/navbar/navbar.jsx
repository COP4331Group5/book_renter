"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.scss";
import logo from "@public/assets/book.png";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const navElements = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Store", href: "/store" },
    { name: "About Us", href: "/about" },
    { name: "Log In", href: "/login" },
    { name: "Account", href: "/account" }
];

export default function NavBar({ sessionExists }) {
    const [showClose, setShowClose] = useState(false);

    function toggleMenu() {
        setShowClose(!showClose);
    }

    const pathname = usePathname();

    let filteredNavElements = navElements;

    if (sessionExists) {
        filteredNavElements = filteredNavElements.filter(
            (link) => link.href != "/login"
        );
    } else {
        filteredNavElements = filteredNavElements.filter(
            (link) => link.href != "/dashboard" && link.href != "/account"
        );
    }

    return (
        <nav>
            <div className="px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="rounded p-1 opacity-50 hover:opacity-100 active:bg-highlight-light active:dark:bg-highlight-dark"
                        >
                            {showClose ? (
                                <AiOutlineClose
                                    size={70}
                                    className="block h-8 w-8"
                                />
                            ) : (
                                <AiOutlineMenu
                                    size={70}
                                    className="block h-8 w-8"
                                />
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <a href="/" className="flex flex-shrink-0 items-center">
                            <Image
                                className="mr-2 h-12 w-fit dark:invert"
                                src={logo}
                                alt="Novel Nest."
                            />
                            <h2>Novel Nest.</h2>
                        </a>
                        <div className="hidden items-center sm:ml-6 sm:flex">
                            <div className="flex space-x-4">
                                {filteredNavElements.map((item) => {
                                    let current = item.href == pathname;
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={
                                                current
                                                    ? styles["current-nav-item"]
                                                    : styles["nav-item"]
                                            }
                                            aria-current={
                                                current ? "page" : undefined
                                            }
                                        >
                                            {item.name}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showClose ? (
                <div className="relative z-[999] sm:hidden">
                    <div className="absolute flex w-full flex-col bg-background-light px-2 py-3 dark:bg-background-dark">
                        {filteredNavElements.map((item) => {
                            let current = item.href == pathname;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={
                                        current
                                            ? styles["current-nav-drop-item"]
                                            : styles["nav-drop-item"]
                                    }
                                    aria-current={current ? "page" : undefined}
                                >
                                    {item.name}
                                </a>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </nav>
    );
}
