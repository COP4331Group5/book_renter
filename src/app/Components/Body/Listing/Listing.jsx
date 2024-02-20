import React from "react";
import "./listing.scss";
import Image from "next/image";

// Imported icons
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";

// Imported images
import img from "@public/assets/classics/img1.jpg";
import img1 from "@public/assets/classics/img2.jpg";
import img2 from "@public/assets/classics/img3.jpg";
import img3 from "@public/assets/classics/img4.jpg";
import img4 from "@public/assets/classics/img5.jpg";
import img5 from "@public/assets/classics/img5.jpg";
import img6 from "@public/assets/classics/img5.jpg";
import img7 from "@public/assets/classics/img5.jpg";

const Listing = () => {
    return (
        <div className="listingSection">
            <div className="heading flex">
                <h1>My Library</h1>
                <button className="btn flex">
                    See All <BsArrowRightShort className="icon" />
                </button>
            </div>

            <div className="secContainer flex">
                <div className="singleItem">
                    <AiFillHeart className="icon" />
                    <Image src={img} alt="Image Name" />
                    <h3>Crime and Punishment</h3>
                </div>

                <div className="singleItem">
                    <AiOutlineHeart className="icon" />
                    <Image src={img1} alt="Image Name" />
                    <h3>Of Mice and Men</h3>
                </div>

                <div className="singleItem">
                    <AiOutlineHeart className="icon" />
                    <Image src={img2} alt="Image Name" />
                    <h3>Frankenstein</h3>
                </div>

                <div className="singleItem">
                    <AiFillHeart className="icon" />
                    <Image src={img3} alt="Image Name" />
                    <h3>Little Women</h3>
                </div>
            </div>

            <div className="sellers flex">
                <div className="topAuthors">
                    <div className="heading flex">
                        <h3>Top Authors</h3>
                        <a href="#/library" className="menuLink flex">
                            <button href="#/library" className="btn flex">
                                See All <BsArrowRightShort className="icon" />
                            </button>
                        </a>
                    </div>

                    <div className="card flex">
                        <div className="users">
                            <Image src={img4} alt="User Image" />
                            <Image src={img5} alt="User Image" />
                            <Image src={img6} alt="User Image" />
                        </div>
                        <div className="cardText">
                            <span>
                                2,600 Books Sold <br />
                                <small>10 Authors</small>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="featuredAuthors">
                    <div className="heading flex">
                        <h3>Featured Authors</h3>
                        <button className="btn flex">
                            See All <BsArrowRightShort className="icon" />
                        </button>
                    </div>

                    <div className="card flex">
                        <div className="users">
                            <Image src={img4} alt="User Image" />
                            <Image src={img5} alt="User Image" />
                            <Image src={img6} alt="User Image" />
                        </div>
                        <div className="cardText">
                            <span>
                                1,400 Books Sold <br />
                                <small>10 Authors</small>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listing;
