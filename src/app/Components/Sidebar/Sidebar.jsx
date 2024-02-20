import React from "react";
import "./sidebar.css";
import Image from "next/image";

// Imported images
import logo from "../../../../public/Assets/book.png";

// Imported icons
import { MdHome } from "react-icons/md";
import { LuShoppingBasket } from "react-icons/lu";
import { FaBookBookmark } from "react-icons/fa6";
import { TbCash } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { IoMdExit } from "react-icons/io";

const Sidebar = () => {
    return (
        <div className="sideBar grid">
            <div className="logoDiv flex">
                <Image src={logo} alt="Image Name" />
                <h2>Novel Nest.</h2>
            </div>

            <div className="menuDiv">
                <h3 className="divTitle">QUICK MENU</h3>
                <ul className="menuLists grid">
                    <li className="listItem">
                        <a href="/dashboard" className="menuLink flex">
                            <MdHome className="icon" />
                            <span className="smallText">Dashboard</span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="/store" className="menuLink flex">
                            <LuShoppingBasket className="icon" />
                            <span className="smallText">Shop</span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="/library" className="menuLink flex">
                            <FaBookBookmark className="icon" />
                            <span className="smallText">Library</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="settingsDiv">
                <h3 className="divTitle">SETTINGS</h3>
                <ul className="menuLists grid">
                    <li className="listItem">
                        <a href="#" className="menuLink flex">
                            <TbCash className="icon" />
                            <span className="smallText">Billing</span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="#" className="menuLink flex">
                            <CgProfile className="icon" />
                            <span className="smallText">Account</span>
                        </a>
                    </li>

                    <li className="listItem">
                        <a href="#" className="menuLink flex">
                            <IoMdExit className="icon" />
                            <span className="smallText">Signout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
