import React from "react";
import "./bookshelf.scss";

import CoverBtn from "@/app/components/input/cover_btn/cover_btn";

export default function Bookshelf() {
    return (
        <div>
            <div className="basis-full">
                <div className="heading">
                    <h1>Fantasy</h1>
                </div>

                <div className="section">
                    <CoverBtn
                        name="The Atlas Complex"
                        img="/assets/fantasy/fantasy1.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Destroy the Day"
                        img="/assets/fantasy/fantasy2.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="The Queen of Nothing"
                        img="/assets/fantasy/fantasy3.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="The Burning Witch"
                        img="/assets/fantasy/fantasy4.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Thornes of Frost"
                        img="/assets/fantasy/fantasy5.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Court of Winter"
                        img="/assets/fantasy/fantasy6.jpg"
                        link="#"
                    />
                </div>
            </div>

            <div className="genre">
                <div className="heading">
                    <h1>Romance</h1>
                </div>

                <div className="section">
                    <CoverBtn
                        name="Say You'll Be Mine"
                        img="/assets/romance/romance1.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="City of Stardust"
                        img="/assets/romance/romance2.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="The Getaway List"
                        img="/assets/romance/romance3.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Happy Place"
                        img="/assets/romance/romance4.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="With Any Luck"
                        img="/assets/romance/romance5.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Divine Rivals"
                        img="/assets/romance/romance6.jpg"
                        link="#"
                    />
                </div>
            </div>

            <div className="genre">
                <div className="heading">
                    <h1>Classics</h1>
                </div>

                <div className="section">
                    <CoverBtn
                        name="Crime and Punishment"
                        img="/assets/classics/img1.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Of Mice and Men"
                        img="/assets/classics/img2.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Frankenstein"
                        img="/assets/classics/img3.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Little Women"
                        img="/assets/classics/img4.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Little Women"
                        img="/assets/classics/img4.jpg"
                        link="#"
                    />
                    <CoverBtn
                        name="Little Women"
                        img="/assets/classics/img4.jpg"
                        link="#"
                    />
                </div>
            </div>
        </div>
    );
}
