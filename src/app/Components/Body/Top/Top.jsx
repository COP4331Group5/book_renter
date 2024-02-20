import React from "react";
import "./top.css";
import Image from "next/image";

// Imported icons
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { BsArrowRightShort, BsQuestionCircle } from "react-icons/bs";

// Imported images
import img from "../../../../../public/Assets/admin.jpg";
import video from "../../../../../public/Assets/admin.jpg";
import img2 from "../../../../../public/Assets/Classics/img6.jpg";

const Top = () => {
    return (
        <div className="topSection">
            <div className="headerSection flex">
                <div className="title">
                    <h1>Welcome to Novel Nest.</h1>
                    <p>Happy reading, Gabby!</p>
                </div>

                <div className="searchBar flex">
                    <input type="text" placeholder="Search Dashboard" />
                    <BiSearchAlt className="icon" />
                </div>

                <div className="adminDiv flex">
                    <MdOutlineNotificationsNone className="icon" />
                    <div className="adminImage">
                        <Image src={img} alt="Admin Image" />
                    </div>
                </div>
            </div>

            <div className="cardSection flex">
                <div className="rightCard flex">
                    <h1>Explore our top sellers</h1>
                    <p>
                        Novel Nest offers a curated selection of quality books
                    </p>

                    <div className="buttons flex">
                        <button className="btn">Top Sellers</button>
                        <button className="btn transparent">Browse All</button>
                    </div>

                    <div className="videoDiv">
                        <video src={video} autoPlay loop muted></video>
                    </div>
                </div>

                <div className="leftCard flex">
                    <div className="main flex">
                        <div className="textDiv">
                            <h1>Pick up where you left off...</h1>

                            <div className="flex">
                                <span>3 Days Remaining</span>
                                <span>127/250 Pages Read</span>
                            </div>

                            <span className="link flex">
                                Resume reading{" "}
                                <BsArrowRightShort className="icon" />
                            </span>
                        </div>

                        <div className="imgDiv">
                            <Image src={img2} alt="Image Name" />
                        </div>

                        {/*<div className="sideBarCard">
                            <BsQuestionCircle className='icon'/>
                            <div className="cardContent">
                                <div className="circle1"></div>
                                <div className="circle2"></div>

                                <h3>what</h3>
                                <p>help</p>

                                <button className='btn'> Go to help center </button>
                            </div>
                
                        </div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Top;
