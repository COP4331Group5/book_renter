import React from "react";
import styles from "./listing.module.scss";
import Image from "next/image";

import CoverBtn from "@components/input/cover_btn/cover_btn";
import SeeAllBtn from "@components/input/see_all_btn/see_all_btn";

// Imported images
import img4 from "@public/assets/classics/img5.jpg";
import img5 from "@public/assets/classics/img5.jpg";
import img6 from "@public/assets/classics/img5.jpg";

export default function Listing() {
    return (
        <div className="basis-full">
            <div className="flex items-center justify-between">
                <h1>My Library</h1>
                <SeeAllBtn href="/library" />
            </div>

            <div id={styles.library}>
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
                    name="Of Mice and Men"
                    img="/assets/classics/img2.jpg"
                    link="#"
                />
            </div>
        </div>
    );
}
