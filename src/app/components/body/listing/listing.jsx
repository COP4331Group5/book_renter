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
        <div className="basis-3/4">
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
            </div>

            <div id={styles.sellers}>
                <div id={styles["top-authors"]}>
                    <div className="flex items-center justify-between gap-4">
                        <h3>Top Authors</h3>
                        <SeeAllBtn href="#" />
                    </div>

                    <div className={styles.card}>
                        <div className={styles.users}>
                            <Image src={img4} alt="User Image" />
                            <Image src={img5} alt="User Image" />
                            <Image src={img6} alt="User Image" />
                        </div>
                        <div className={styles["card-text"]}>
                            <span>
                                2,600 Books Sold <br />
                                <small>10 Authors</small>
                            </span>
                        </div>
                    </div>
                </div>

                <div id={styles["featured-authors"]}>
                    <div className="flex items-center justify-between gap-4">
                        <h3>Featured Authors</h3>
                        <SeeAllBtn href="#" />
                    </div>

                    <div className={styles.card}>
                        <div className={styles.users}>
                            <Image src={img4} alt="User Image" />
                            <Image src={img5} alt="User Image" />
                            <Image src={img6} alt="User Image" />
                        </div>
                        <div className={styles["card-text"]}>
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
}
