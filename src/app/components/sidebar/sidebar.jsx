import React from "react";
import styles from "./sidebar.module.scss";
import Image from "next/image";

// Imported images
import logo from "@public/assets/book.png";

// Imported icons
import { MdHome } from "react-icons/md";
import { LuShoppingBasket } from "react-icons/lu";
import { FaBookBookmark } from "react-icons/fa6";
import { TbCash } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";

export default function Sidebar() {
    const listItem = styles["list-item"];
    const menuLink = styles["menu-link"];

    return (
        <div id={styles["sidebar"]} className="grid">
            <a
                id={styles["logo"]}
                className="flex items-center justify-center"
                href="/"
            >
                <Image src={logo} alt="Image Name" />
                <h1>Novel Nest.</h1>
            </a>

            <div id={styles["menu"]}>
                <h3 className={styles["title"]}>QUICK MENU</h3>
                <ul className={`${styles["menu-list"]} grid`}>
                    <li className={listItem}>
                        <a href="/dashboard" className={menuLink}>
                            <MdHome className="icon" />
                            <span>
                                <small>Dashboard</small>
                            </span>
                        </a>
                    </li>

                    <li className={listItem}>
                        <a href="/store" className={menuLink}>
                            <LuShoppingBasket className="icon" />
                            <span>
                                <small>Shop</small>
                            </span>
                        </a>
                    </li>

                    <li className={listItem}>
                        <a href="/library" className={menuLink}>
                            <FaBookBookmark className="icon" />
                            <span>
                                <small>Library</small>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

            <div id={styles["settings"]}>
                <h3 className={styles["title"]}>SETTINGS</h3>
                <ul className={`${styles["menu-list"]} grid`}>
                    <li className={listItem}>
                        <a href="#" className={menuLink}>
                            <TbCash className="icon" />
                            <span>
                                <small>Billing</small>
                            </span>
                        </a>
                    </li>

                    <li className={listItem}>
                        <a href="#" className={menuLink}>
                            <CgProfile className="icon" />
                            <span>
                                <small>Account</small>
                            </span>
                        </a>
                    </li>

                    <li className={listItem}>
                        <a href="#" className={menuLink}>
                            <IoMdExit className="icon" />
                            <span>
                                <small>Signout</small>
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
