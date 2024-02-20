import React from "react";
import "./bookshelf.css";
import Image from "next/image";

// Imported icons
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

// Imported images
import img from "../../../../../public/Assets/Classics/img1.jpg";
import img1 from "../../../../../public/Assets/Classics/img2.jpg";
import img2 from "../../../../../public/Assets/Classics/img3.jpg";
import img3 from "../../../../../public/Assets/Classics/img4.jpg";
import r1 from "../../../../../public/Assets/Romance/romance1.jpg";
import r2 from "../../../../../public/Assets/Romance/romance2.jpg";
import r3 from "../../../../../public/Assets/Romance/romance3.jpg";
import r4 from "../../../../../public/Assets/Romance/romance4.jpg";
import r5 from "../../../../../public/Assets/Romance/romance5.jpg";
import r6 from "../../../../../public/Assets/Romance/romance6.jpg";
import f1 from "../../../../../public/Assets/Fantasy/fantasy1.jpg";
import f2 from "../../../../../public/Assets/Fantasy/fantasy2.jpg";
import f3 from "../../../../../public/Assets/Fantasy/fantasy3.jpg";
import f4 from "../../../../../public/Assets/Fantasy/fantasy4.jpg";
import f5 from "../../../../../public/Assets/Fantasy/fantasy5.jpg";
import f6 from "../../../../../public/Assets/Fantasy/fantasy6.jpg";

const Bookshelf = () => {
    return (
        <div className="bookshelf">
            <div className="genre">
                <div className="heading flex">
                    <h1>Fantasy</h1>
                </div>

                <div className="secContainer flex">
                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={f1} alt="Image Name" />
                        <h3>The Atlas Complex</h3>
                    </div>

                    <div className="singleItem">
                        <AiOutlineHeart className="icon" />
                        <Image src={f2} alt="Image Name" />
                        <h3>Destroy the Day</h3>
                    </div>

                    <div className="singleItem">
                        <AiOutlineHeart className="icon" />
                        <Image src={f3} alt="Image Name" />
                        <h3>The Queen of Nothing</h3>
                    </div>

                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={f4} alt="Image Name" />
                        <h3>The Burning Witch</h3>
                    </div>

                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={f5} alt="Image Name" />
                        <h3>Thornes of Frost</h3>
                    </div>

                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={f6} alt="Image Name" />
                        <h3>Court of Winter</h3>
                    </div>
                </div>
            </div>

            <div className="genre">
                <div className="heading flex">
                    <h1>Romance</h1>
                </div>

                <div className="secContainer flex">
                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={r1} alt="Image Name" />
                        <h3>Say You'll Be Mine</h3>
                    </div>

                    <div className="singleItem">
                        <AiOutlineHeart className="icon" />
                        <Image src={r2} alt="Image Name" />
                        <h3>City of Stardust</h3>
                    </div>

                    <div className="singleItem">
                        <AiOutlineHeart className="icon" />
                        <Image src={r3} alt="Image Name" />
                        <h3>The Getaway List</h3>
                    </div>

                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={r4} alt="Image Name" />
                        <h3>Happy Place</h3>
                    </div>

                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={r5} alt="Image Name" />
                        <h3>With Any Luck</h3>
                    </div>

                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={r6} alt="Image Name" />
                        <h3>Divine Rivals</h3>
                    </div>
                </div>
            </div>

            <div className="genre">
                <div className="heading flex">
                    <h1>Classics</h1>
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

                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={img3} alt="Image Name" />
                        <h3>Little Women</h3>
                    </div>

                    <div className="singleItem">
                        <AiFillHeart className="icon" />
                        <Image src={img3} alt="Image Name" />
                        <h3>Little Women</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookshelf;
